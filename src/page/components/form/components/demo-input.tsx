import { Input, DatePicker } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

export default function DemoInput() {
  const [value, setValue] = useState<any>("");
  const [num, setNum] = useState<number>();
  const [emoji, setEmoji] = useState();
  const [picker, setPicker]: any = useState();
  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleInputNum = (e: any) => {
    const val = e.target.value.replace(/\D/g, "");
    setNum(val);
  };

  const handleInputEmoji = (e: any) => {
    setEmoji(e.target.value);
  };

  const handleSelectChange = (e: any) => {
    setPicker(dayjs(e).format("YYYY-MM-DD"));
  };

  return (
    <>
      <div className="my-2">
        <div>普通输入框：</div>
        <Input
          className="w-60"
          placeholder="请输入内容"
          value={value}
          onChange={handleInput}
        />
      </div>
      <div className="my-2">
        <div>数字输入框：</div>
        <Input
          className="w-60"
          placeholder="请输入数字"
          value={num}
          onChange={handleInputNum}
        />
      </div>
      <div className="my-2">
        <div>自定义格式化输入框：</div>
        <Input
          className="w-60"
          placeholder="请输入数字"
          value={num}
          onChange={handleInputNum}
        />
      </div>
      <div className="my-2">
        <div>表情包输入框：</div>
        <Input
          className="w-60"
          placeholder="请输入😄"
          value={emoji}
          onChange={handleInputEmoji}
        />
      </div>
      <div className="my-2">
        <div>日期选择框：</div>
        <DatePicker onChange={handleSelectChange} />
      </div>
    </>
  );
}
