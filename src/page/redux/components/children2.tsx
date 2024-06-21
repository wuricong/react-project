import {Button} from "antd";

export default function () {
  const handleSend = () => {
    console.log(11)
  }
  return (
    <div>
      <Button type="primary" onClick={handleSend}>传参</Button>
      兄弟组件2
    </div>
  )
}
