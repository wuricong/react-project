import "./index.css";
import Background from "../../assets/bg.jpg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const styleUrl = {
  backgroundImage: `url(${Background})`,
};

function Login() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/page/home");
  };
  return (
    <div className="box" style={styleUrl}>
      <div className="login-form">
        <Button type="primary" onClick={handleClick}>
          登录
        </Button>
      </div>
    </div>
  );
}

export default Login;
