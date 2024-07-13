import "./index.less";
import Background from "../../assets/bg.jpg";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const styleUrl = {
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
};

function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [account, setAccount] = useState("admin");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if (account !== "admin") {
      messageApi.error("账号错误");
      return;
    }
    if (password !== "2260220325") {
      messageApi.error("密码错误");
      return;
    }
    sessionStorage.setItem("password", "2260220325");
    navigate("/page/home");
  };

  const handleInputAccount = (val: string) => {
    setAccount(val);
  };

  const handleInputPassword = (val: string) => {
    setPassword(val);
  };
  return (
    <>
      {contextHolder}
      <div className="box" style={styleUrl}>
        <div className="login-form">
          <div className="row">
            <span>账号:</span>
            <Input
              placeholder="请输入账号"
              value={account}
              onChange={(e) => handleInputAccount(e.target.value)}
            />
          </div>

          <div className="row">
            <span>密码:</span>
            <Input
              placeholder="请输入密码"
              type="password"
              value={password}
              onChange={(e) => handleInputPassword(e.target.value)}
            />
          </div>

          <Button className="login-btn" type="primary" onClick={handleClick}>
            登录
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
