import "./index.less";
import Background from "../../assets/bg1.jpg";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import { AuthLogin } from "@/api";

const styleUrl = {
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
};

function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [account, setAccount] = useState("admin");
  const [password, setPassword] = useState("2260220325");
  const input: any = createRef();
  // 初次挂载页面密码框聚焦
  useEffect(() => {
    const token = sessionStorage.getItem("password");
    if (token) {
      navigate("/dashboard");
    }
    input.current.focus();
  }, []);
  const handleLogin = () => {
    let params = {
      username: account,
      password,
    };
    AuthLogin(params).then((res) => {
      sessionStorage.setItem("password", "2260220325");
      navigate("/dashboard");
    });
  };

  const handleInputAccount = (val: string) => {
    setAccount(val);
  };

  const handleInputPassword = (val: string) => {
    setPassword(val);
  };

  const handleKeyDown = (val: any) => {
    const { code } = val;
    if (code === "Enter") {
      handleLogin();
    }
  };

  const pushAccountInfo = () => {
    messageApi.warning("开发中");
    // navigate("/resume");
  };
  return (
    <>
      {contextHolder}
      <div className="box" style={styleUrl}>
        <div className="login-form">
          <i className="iconfont icon-denglu !text-6xl h-2/5 pt-12 mb-2 text-white" />
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
              ref={input}
              placeholder="请输入密码"
              type="password"
              value={password}
              onChange={(e) => handleInputPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <Button className="login-btn" type="primary" onClick={handleLogin}>
            登录
          </Button>
        </div>

        <Button
          className="account-info"
          onClick={pushAccountInfo}
          type="primary"
        >
          个人信息
        </Button>
      </div>
    </>
  );
}

export default Login;
