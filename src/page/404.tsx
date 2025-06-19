import imgSrc from "@/assets/404.jpg";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const handleBack = () => {
    const navigate = useNavigate();
    navigate("/login");
  };
  return (
    <>
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: "#CBCBD3" }}
      >
        <img src={imgSrc} alt="" />
      </div>
      <button onClick={handleBack}>返回</button>
    </>
  );
}

export default NotFound;
