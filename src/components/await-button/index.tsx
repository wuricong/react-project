import {Button} from "antd";
import {useState} from "react";

interface BtnOptions {
  children: string,
  type?: undefined,
  req: Function
}

export default function AwaitButton(props: BtnOptions) {
  const [loading, setLoading] = useState<boolean>(false)
  const {type, req} = props
  const handleReq = async () => {
    setLoading(true)
    await req()
    setLoading(false)
  }
  return <>
    <Button loading={loading} onClick={handleReq} type={type || 'primary'}>{props.children}</Button>
  </>
}
