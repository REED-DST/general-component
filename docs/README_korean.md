# General Component

General Component(이하 GC)는 React를 위한 컴포넌트 자동생성을 통해 앱의 프로토타입을 빠르게 작성할 수 있도록 돕는 라이브러리입니다.

GC를 사용하면 여러분의 프로토타입을 위해서 컴포넌트를 작성할 필요가 없습니다. 컴포넌트를 만들기 전에 컴포넌트를 사용할 수 있어요! 아래의 예제를 확인하세요. 우리가 아직까지 `CP.Greeting`이라는 컴포넌트를 만든 적이 없다는 점을 유의하세요.

Do you use English? [Here is the original English copy.](https://github.com/REED-DST/general-component/blob/master/README.md)

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

## 시작하기

### Install

GC는 NPM 패키지 저장소에 저장되어 있습니다. 다음 커맨드를 통해서 설치할 수 있습니다.

```shell script
npm i general-component
```

### 기본적인 사용법

우선 `CP`를 임포트하세요. `CP`는 `ComponentPool`의 약자입니다. 여러분의 아직 만들어지지 않은 컴포넌트를 사용하기 위해서는 `CP.YourComponentName`과 같이 입력하시면 됩니다.

문자열, 숫자, 그리고 날짜를 렌더링하기 위해서는 다음과 같이 작성하면 됩니다. 어떻게 작동하는지 보기 위해서 다른 이름의 프로퍼티도 시험삼아 넣어보세요!

```typescript jsx
import CP from "general-component";

<CP.UserCard
  name={"John Doe"}
	  age={24}
  joinedAt={new Date()}
/>
```

![Example code result 2](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-2.png)

### 버튼 만들기

파라미터를 받지 않는 함수를 값으로 넘김으로써 버튼을 만들 수 있습니다.

```typescript jsx
<CP.UserCard
  name={"John Doe"}
  onClick={()=>alert("Hi!")}
/>
```

![Example code result 3](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-3.png)

### 문자열과 정수 입력받기

여러분이 `onValueChange`와 `value` 페어를 같이 넘기면, 하나의 인풋 컴포넌트로 합쳐지게 됩니다.

현재 버전에서는 해당 기능은 문자열과 정수(실수 미포함)에 대해서만 지원합니다.

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

### 배열 다루기

여러분은 다음과 같이 서브 오브젝트를 삽입할 수 있습니다.

`key`나 `id`를 넘겨야 한다는 사실을 기억하세요. 그렇지 않으면 React 라이브러리가 warning을 표시합니다.

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

### 커스텀 자식 컴포넌트 삽입하기

children 프로퍼티가 전달되면, 이는 자동생성된 프로퍼티 바로 밑에 표시됩니다.

```typescript jsx
<CP.SocialMediaFeed
  title={"Hi Doe"}
>
  <CustomFeedBody feed={feed}/>
</CP.SocialMediaFeed>
```

![Example code result 6](https://raw.githubusercontent.com/REED-DST/general-component/master/docs/images/example-code-result-6.png)

### 지원되지 않는 프로퍼티의 표시

GC가 지원하지 않는 프로퍼티를 맞닥뜨리게되면, 렌더링을 포기하고 이들의 이름만 아래쪽에 표시합니다.

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

### 커스텀 컴포넌트로 교체하기

좋아요, 여러분은 프로토타이핑을 마무리하였고, 이제 실제 컴포넌트를 적용시켜야합니다.

그럼 그냥 `CP`에 커스텀 컴포넌트를 대입하면 됩니다.

어디에든 이 코드를 삽입해도 되지만, App.js 최상단에 하는 것을 권장합니다.

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

### 커스텀 미들웨어 삽입하기

여러분이 GC를 커스터마이즈 할 수도 있습니다! 여러분의 특별한 데이터타입이 GC에 의해 번역되게 할 수 있어요.

미들웨어에는 세 가지가 있습니다.

* Entry transformation middleware
* Field generation middleware
* Component generation middleware

이 미들웨어들은 아래의 코드와 같은 방법으로 수정할 수 있습니다.

의도된 것이 아니라면, 이미 정의된 미들웨어를 삽입하는 것을 빠뜨리지 마세요. 

```typescript jsx
import {
    entryTransMiddlewares,
    fieldGenMiddlewares,
    componentGenMiddlewares,
    
    setEntryTransMiddlewares,
    setFieldGenMiddlewares,
    setComponentGenMiddlewares,
} from "general-component";

setEntryTransMiddlewares([...entryTransMiddlewares, yourCustomMiddleware]);
```

### 주의사항

`style`, `innerStyle`, `children`, `innerClassName` 그리고 `className`은 다른 프로퍼트와 같은 방식으로 번역되지 않습니다.

`style`과 `className`은 GC의 루트 컴포넌트에 전달됩니다.

`innerStyle`과 `innerClassName`은 GC의 자식 컴포넌트 래퍼에 전달됩니다.

`children`은 자동생성된 컴포넌트의 하단에 직접 렌더링됩니다.

## 사용해야 할 때

- 로직 구현에 집중하고싶을때. 그냥 모든 데이터를 GC에 넘겨버리고 실제 컴포넌트 구현은 다른 사람이나 미래의 자신에게 위임하세요.
- 여러분이 데이터 API를 받았는데 무엇이 전달되는지 파악이 안 되었을 때. 그냥 모든 데이터를 GC에 넘겨버려요! 최소한 어떠한 데이터가 안에 있는지는 확인할 수 있습니다. 그 다음 필요없는 필드를 지워버리세요.

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

## 기여하기

다양한 방법으로 GC에 참여할 수 있습니다.

- 정식 컨트리뷰터로 활동하는 것
- 이슈를 해결하고 버그를 잡는 것
- 아이디어를 알려주거나, 기능 추가를 요청하고 피드백해주는 것
- 기부하기

여러분이 기여하고싶으시다면, contact@reeddst.com으로 메일을 보내주세요.

## License

Licensed under the MIT License, Copyright © 2021-present by REED
