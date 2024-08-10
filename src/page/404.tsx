import imgSrc from "@/assets/404.jpg";

function NotFound() {
  return (
    <>
      <div className="w-full h-full">
        <img src={imgSrc} />
      </div>
    </>
  );
}

export default NotFound;
