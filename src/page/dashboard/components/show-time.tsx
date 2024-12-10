import { Popover } from "antd";

interface Prop {
  content?: "";
}

export default function (props: Prop) {
  return <Popover className="">{props.content}</Popover>;
}
