import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice.js";

export default function Counter() {
  const count = useSelector((state: any) => {
    console.log("state", state);
    return state.value?.counter;
  });
  console.log("count", count);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>当前值{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
