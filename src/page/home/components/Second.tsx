import { useContext } from "react";
import { OutContext } from "../components/Context";

export default function Second() {
  const value = useContext(OutContext);
  return (
    <div className="ml-2">
      第二层
      <div>{value}</div>
    </div>
  );
}
