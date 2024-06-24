import "./index.css";
import Background from "../../assets/bg.jpg";

const styleUrl = {
  backgroundImage: `url(${Background})`,
};

function Login() {
  return (
    <div className="box" style={styleUrl}>
      <div className="login-form"></div>
    </div>
  );
}

export default Login;
