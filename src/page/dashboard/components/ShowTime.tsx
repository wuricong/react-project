import { Popover } from "antd";

interface Prop {
  text?: "";
}

export default function (props: Prop) {
  return <Popover className="">{props.text}</Popover>;
}
