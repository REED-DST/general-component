# General Component

General Component(GC, from now) is a React component generation library which helps you prototype your service quickly.

With using this library, you don't need to write your components to build prototype. You can just use components before you write them! See below. Pay attention that there's no declaration of `CP.Greeting` component.

한국어를 사용하시나요? [여기 한국어 번역본이 있습니다.](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/README_korean.md)

```typescript jsx
import CP from "general-component";

function App() {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="App">
      <CP.Greeting
        style={{width: "370px"}}
        title={"Hello, buddies!"}
        description={"Let me introduce my new progress of react development!"}
        tags={[
          {id: "1", body: "react"},
          {id: "2", body: "react native"},
          {id: "3", body: "open source"},
          {id: "4", body: "frontend"}
        ]}
        message={message}
        onMessageChange={setMessage}
        onReply={()=>alert("Danke! You replied with: " + message)}
      />
    </div>
  );
}
```

![Example code result 1](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-1.png)

## Getting started

### Install

The library is hosted on NPM repository. You can use the following commands to install GC.

```shell script
npm i general-component
```

### Basic usage

First, import `CP`, which is abbreviation of `ComponentPool`, to use this library. Use `CP.YourComponentName` pattern to pre-use your component.

You can render string, number and Date by the following code. Feel free to add more properties with different names so that you know how it works!

```typescript jsx
import CP from "general-component";

<CP.UserCard
  name={"John Doe"}
	  age={24}
  joinedAt={new Date()}
/>
```

![Example code result 2](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-2.png)

### Creating button

You can create a button with passing a parameterless function.

```typescript jsx
<CP.UserCard
  name={"John Doe"}
  onClick={()=>alert("Hi!")}
/>
```

![Example code result 3](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-3.png)

### Creating string and integer inputs

If you pass properties with `onValueChange` and `value` pair, they are combined into one editing component.

At this moment this behavior only works with string and integer types(not including float).

```typescript jsx
<CP.SignIn
  id={id}
  onIdChange={setId}
  password={password}
  onPasswordChange={setPassword}
  onSignIn={()=>alert("Signed in!")}
/>
```

![Example code result 4](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-4.png)

### Handling array of data

You can insert sub objets with the following code.

Remember, you are asked to pass `key` or `id` field. If you don't, React may complain about this.(Though it works)

```typescript jsx
<CP.SocialMediaFeed
  title={"Hi Doe"}
  body={"How's everything going?"}
  tags={[
    {id: "doe", name: "doe"},
    {id: "greeting", name: "greeting"},
    {id: "good", name: "feeling good"},
  ]}
/>
```

![Example code result 5](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-5.png)

### Embedding custom children

When you pass children, they will be displayed right after auto-generated properties.

```typescript jsx
<CP.SocialMediaFeed
  title={"Hi Doe"}
>
  <CustomFeedBody feed={feed}/>
</CP.SocialMediaFeed>
```

![Example code result 6](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-6.png)

### How unhandled properties are shown

When GC encounters with unexpected properties, it gives up to render it and renders only their names at the bottom.

```typescript jsx
<CP.HasUnknownProps
  title={"String can be read"}
  specialBody={{
    an_object: "zxcv",
    something: "asfd",
    special: "qwer",
  }}
/>
```

![Example code result 7](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-7.png)

### Replacing with custom component

Okay, you done your prototyping and actual components should be placed.

Then you can simply assign your custom components to `CP`.

You can insert this code anywhere, but it's recommended to do this at the top of App.js file.

```typescript jsx
const CustomComponent = (p: {title: string}) => {
  const {title} = p;

  const style: Record<string, any> = {
    width: "140px",
    border: "2px dashed pink",
    padding: "8px",
  };
  return <div style={style}>This is a custom component! with title: {title}</div>;
};

CP.Post = CustomComponent;

function App() {
  return <CP.Post
    title={"The aliens conquered the White House"}
  />;
};
```

![Example code result 8](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-8.png)

### Adding custom middleware

You can customize the library! You can let your special data types can be read by General Component.

At time moment, to do this. you need to fork the library and add custom middleware. We are planning to adopt adding or replacing custom middleware without modifying the original library in a month(by 2021-08)!

To customize the library, please read the documents below.

### Caveats

`style`, `innerStyle`, `children`, `innerClassName` and `className` properties will not processed like other properties.

`style` and `className` will be passed to root container of General Component. `innerStyle` and `innerClassName` will be passed to property components wrapper(for example, you can set `display: flex` or `flex-direction: row` in here).

`children` is rendered directly below the auto-generated components.

## When to use it

- When you want to concentrate on your logic. Just pass the whole data to General component, and leave implementing the actual components to others or you in the future.
- When you have data API and don't know the schema. Just pass the whole JS object to General component! At least you can see which values are in there, and remove unnecessary fields.

```typescript jsx
function App() {
  const [callResult, setCallResult] = useState<any>();
  useEffect(
    ()=>{ axios("https://random-data-api.com/api/app/random_app").then(setCallResult); },
    []
  );

  // Just put your data! We'll handle extra!
  // You event don't need to know the data schema.
  return <CP.App {...callResult?.data}/>;
}
```

![Example code result 9](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-9.png)

## Documents

On progress!(May be ready by 2021-08)

## Contribute

You can contribute to the project in various ways.

- Become a regular contributor and one of our team members
- Resolve issues and fix bugs
- GIve ideas, do feature requests and feedback
- Donation

Please do not hesitate to send email to contact@reeddst.com if you want to contribute!

## License

Licensed under the MIT License, Copyright © 2021-present by REED
