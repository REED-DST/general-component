import {Set, Map} from "immutable";
import * as r from "ramda";
import {EditEntry, Entry, EntryTransMiddleware, RawEntry} from "../core";

const bundleValueSetterPairs: EntryTransMiddleware = {
  fn: (entries: Entry[]): Entry[] => {
    // Utility function.
    const eventName = (name: string): string | undefined => {
      const nameTokens = name.split(" ");

      if (nameTokens.length > 2) {
        const first = nameTokens[0];
        const last = nameTokens[nameTokens.length - 1];

        if (first === "on" && last === "change")
        {
          return nameTokens.slice(1, nameTokens.length - 1).join(" ");
        }
      }

      return;
    };
    const notNull = (a: any) => a != null;

    // To index, entry pair.
    // @ts-ignore
    const indexedEntries: {index: number; entry: Entry}[] = r.addIndex(r.map)(
      // @ts-ignore
      (entry: Entry, index: number) => ({index, entry}),
      entries
    );

    // Group into 2.
    const filterByKind = (targetKind: string) => ({entry: {kind}}: {entry: Entry}) => kind === targetKind;
    // @ts-ignore
    const indexedRawEntries: {index: number; entry: RawEntry}[] = r.filter(filterByKind("RAW"), indexedEntries);
    // @ts-ignore
    const indexedEditEntries: {index: number; entry: EditEntry}[] = r.filter(filterByKind("EDIT"), indexedEntries);

    // Filter raw-entries with event name.
    const eventNamedEntries = r.filter(
      ({entry}: {entry: RawEntry}) => eventName(entry.name) != null,
      indexedRawEntries
    );

    // Filter event-named-entries with actual matching value pair.
    const indexedRawEntryToPair = (indexedEntry: {index: number; entry: RawEntry}) => [indexedEntry.entry.name, indexedEntry];
    // @ts-ignore
    const rawEntriesByName = Map(r.map(indexedRawEntryToPair, indexedRawEntries));
    // @ts-ignore
    const valuePairedEntries: {
      setter: {index: number; entry: RawEntry};
      value: {index: number; entry: RawEntry};
      index: number;
    }[] = r.pipe(
      r.map(
        ({index, entry}: {index: number; entry: RawEntry}) => {
          // Get matching value existence and its name.
          const theValueName = eventName(entry.name) as string;
          const theValue = rawEntriesByName.get(theValueName) as {index: number; entry: RawEntry};

          // Throw away if there's no matching value.
          if (theValue == null) { return; }

          // Wrap into matching object.
          return {
            setter: {index, entry},
            value: theValue,
            index: theValue.index,
          };
        }
      ),
      r.filter(notNull)
    )(eventNamedEntries);

    // Subtract: rawEntries - valuePairedEntries.
    const usedIndexes = Set(
      r.unnest(
        r.map(
          (entryPair: {
            setter: {index: number; entry: RawEntry};
            value: {index: number; entry: RawEntry};
            index: number;
          }) => [entryPair.setter.index, entryPair.value.index],
          valuePairedEntries
        )
      )
    );
    const subtractedIndexedRawEntries = r.filter(
      (indexedEntry: {index: number}) => !usedIndexes.has(indexedEntry.index),
      indexedRawEntries
    );

    // Convert valuePairedEntries into actual, indexed>EditEntry.
    const toEditEntry = (indexed: {
      setter: {index: number; entry: RawEntry};
      value: {index: number; entry: RawEntry};
      index: number;
    }) => ({
      index: indexed.index,
      entry: {
        kind: "EDIT",
        value: indexed.value.entry,
        setter: indexed.setter.entry,
      } as EditEntry,
    });
    const valuePairedIndexedEditEntries: {index: number; entry: EditEntry}[] = r.map(toEditEntry, valuePairedEntries);

    // Merge and sort.
    const mergedIndexedEntries: {index: number; entry: Entry}[] = [
      ...subtractedIndexedRawEntries,
      ...indexedEditEntries,
      ...valuePairedIndexedEditEntries
    ];
    const compareFn = (a: {index: number}, b: {index: number}) => a.index - b.index;
    mergedIndexedEntries.sort(compareFn);

    // To entries.
    const unboxIndexed = (indexed: {index: number; entry: Entry}) => indexed.entry;
    const finalEntries: Entry[] = r.map(unboxIndexed, mergedIndexedEntries);

    // Response.
    return finalEntries;
  },
};

export default bundleValueSetterPairs;
