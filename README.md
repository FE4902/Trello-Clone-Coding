# 강의 정보

### 강의명

노마드코더 'React JS 마스터클래스'

### 스킬

`React`, `Recoil`, `TypeScript`

# 강의 내용

## 노드 버전 관리 방법

최신 node로 실행 불가능, nvm을 사용해서 node 16 으로 낮춰서 실행

### nvm 사용법

-   node 리스트 보기

```
nvm ls
```

-   node 설치

```
nvm install [version]
```

-   node 버전 변경

```
nvm use [version]
```

-   node 삭제

```
nvm uninstall [version]
```

## Array.splice()

배열의 기존 요소를 삭제 또는 교체하거나 새 요소는 추가하는 메서드

### 삭제하기

```js
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 1);

console.log(removed); // ["mandarin"]
console.log(myFish); // ["angel", "clown", "sturgeon"]
```

### 교체하기

```js
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 1, "drum");

console.log(removed); // ["mandarin"]
console.log(myFish); // ["angel", "clown", "drum", "sturgeon"]
```

### 추가하기

```js
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 0, "drum");

console.log(removed); // []
console.log(myFish); // ["angel", "clown", "drum", "mandarin", "sturgeon"]
```

## Object.keys()

객체의 key 값들을 배열로 반환하는 메서드

```js
const obj = { 0: "a", 1: "b", 2: "c" };

console.log(Object.keys(obj)); // ["0", "1", "2"]
```

## useRef

렌더링에 필요하지 않은 값을 참조할 수 있는 훅으로 값을 참조하거나 DOM을 조작하는데 사용됨

### 값 참조하기

```jsx
import { useRef } from "react";

export default function App() {
    let ref = useRef(0);

    function handleClick() {
        ref.current = ref.current + 1;
        alert("You clicked " + ref.current + " times!");
    }

    return <button onClick={handleClick}>Click me!</button>;
}
```

### DOM 조작하기

```jsx
import { useRef } from "react";

export default function App() {
    const inputRef = useRef(null);

    function handleClick() {
        inputRef.current.focus();
    }

    return (
        <>
            <input ref={inputRef} />
            <button onClick={handleClick}>Focus the input</button>
        </>
    );
}
```

## Recoil

### Atoms

```js
const fontSizeState = atom({
    key: "fontSizeState",
    default: 14,
});
```

-   key 값은 전역적으로 고유한 값으로 설정

```jsx
function FontButton() {
    const [fontSize, setFontSize] = useRecoilState(fontSizeState);
    return (
        <button
            onClick={() => setFontSize((size) => size + 1)}
            style={{ fontSize }}
        >
            Click to Enlarge
        </button>
    );
}
```

-   `atom`을 읽고 수정할때는 `useRecoilState()`를 사용
-   `atom`을 읽기만 할 때 `useRecoilValue()`를 사용
-   `atom`을 수정하기만 할 때 `useSetRecoilState()`를 사용

### Selectors

```js
const fontSizeLabelState = selector({
    key: "fontSizeLabelState",
    get: ({ get }) => {
        const fontSize = get(fontSizeState);
        const unit = "px";

        return `${fontSize}${unit}`;
    },
});
```

-   `get`속성은 계산될 함수, 전달되는 `get` 인자를 통해 `atoms`와 다른 `selectors`에 접근할 수 있음

```jsx
function FontButton() {
	const [fontSize, setFontSize] = useRecoilState(fontSizeState);
	const fontSizeLabel = useRecoilValue(fontSizeLabelState);

	return (
		<>
			<div>Current font size: ${fontSizeLabel}</div>
			<button onClick={setFontSize(fontSize + 1) style={fontSize}}>
				Click to Enlarge
			</button>
		</>
	)
}
```

-   호출 방법 및 사용 방법은 `atom`과 비슷
