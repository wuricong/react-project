import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice.ts";
import { Button } from "antd";

export default function Counter() {
  const count = useSelector((state: any) => {
    console.log("state", state);
    return state.value?.counter;
  });
  console.log("count", count);
  const dispatch = useDispatch();
  return (
    <div className="my-2">
      <div>
        <Button
          type={"primary"}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span className="mx-2">当前值{count}</span>
        <Button
          type={"primary"}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </div>
  );
}
