function Child() {
  return <div>我是子组件</div>;
}

function Parson(props: any) {
  return (
    <div>
      {props.children}
      我是父组件
    </div>
  );
}

export default function () {
  return (
    <Parson>
      <Child></Child>
    </Parson>
  );
}
