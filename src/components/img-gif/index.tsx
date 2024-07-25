import { useEffect, useRef, useState } from "react";
import imgFif from "@/assets/gif/640.gif";

export default function GifComponent() {
  const canvas: any = useRef(null);
  const imageFrame: any = useRef(null);
  let [index, setIndex] = useState(0);
  const imageDecoder: any = useRef();
  const getDimensions = (blob: any): any => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.addEventListener("load", () => {
        URL.revokeObjectURL(blob);
        return resolve({ width: img.naturalWidth, height: img.naturalHeight });
      });
      img.src = URL.createObjectURL(blob);
    });
  };

  async function decodeImage(imageByteStream: any) {
    //@ts-ignore
    imageDecoder.current = new ImageDecoder({
      data: imageByteStream,
      type: "image/gif",
    });
    //解码
    imageFrame.current = await imageDecoder.current.decode({
      frameIndex: 0, // imageIndex从0开始
    });
    const track = imageDecoder.current.tracks.selectedTrack;
    console.log("track", track);
    await renderImage(imageFrame.current, track);
  }

  async function renderImage(frame: any, track: any) {
    const canvasCtx = canvas.current.getContext("2d");
    canvasCtx.drawImage(frame.image, 0, 0);
    setIndex(++index);
    if (track.frameCount === 1) return;
    if (index >= track.frameCount) {
      setIndex(0);
      return;
    }
    console.log("track.frameCount", index);
    const nextImage = await imageDecoder.current.decode({
      frameIndex: index,
    });
    setTimeout(() => {
      renderImage(nextImage, track);
    }, frame.image.duration / 1000);
  }

  useEffect(() => {
    const run = async () => {
      const res = await fetch(imgFif);
      const clone = res.clone();
      const blob = await res.blob();
      const { width, height } = await getDimensions(blob);
      canvas.current.width = width;
      canvas.current.height = height;
      //@ts-ignore
      await decodeImage(clone.body);
    };
    run();
  }, []);
  return (
    <div>
      <canvas ref={canvas}></canvas>
    </div>
  );
}
