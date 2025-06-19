import imgSrc from "@/assets/404.jpg";

function NotFound() {
  return (
    <>
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: "#CBCBD3" }}
      >
        <img src={imgSrc} />
      </div>
    </>
  );
}

export default NotFound;
