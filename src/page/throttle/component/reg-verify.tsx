import { Button, Input, Space } from "antd";
import { useState } from "react";
import { useMessage } from "@/utils";

const { TextArea } = Input;

function RegVerify() {
  const [regStr, setRegStr]: any = useState("");
  const [regValue, setRegValue] = useState("");
  const { message } = useMessage();
  const handleVerify = () => {
    if (!regStr) return message.error("正则表达式不能为空");
    if (!regValue) return message.error("值不能为空");
    if (!regStr.startsWith("/") && !regStr.endsWith("/")) {
      return message.error("请输入正确的正则表达式");
    }
    const Reg = new RegExp(regStr.slice(1, -1));
    const result = Reg.test(regValue);
    if (result) {
      message.success("校验成功");
    } else {
      message.error("校验失败");
    }
  };

  const handleMatch = () => {};
  const handleRegInput = (e: any) => {
    setRegStr(e.target.value);
  };
  const handleRegValue = (e: any) => {
    setRegValue(e.target.value);
  };
  return (
    <div className="mt-2">
      <div>正则校验</div>
      <TextArea
        className="mb-2"
        placeholder="请输入正则表达式"
        value={regStr}
        onInput={handleRegInput}
      />
      <Input
        className="mb-2"
        placeholder="请输入需要校验的值"
        onInput={handleRegValue}
        value={regValue}
      />
      <Space>
        <Button type="primary" onClick={handleVerify}>
          校验
        </Button>
        <Button type="primary" onClick={handleMatch}>
          匹配
        </Button>
      </Space>
    </div>
  );
}

export default RegVerify;
