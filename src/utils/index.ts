/**
 * 图片转base64编码(回调函数形式)
 * @param url 图片路径
 * @param cb 回调函数出参
 * */
export function getImgBase64Data(url: string, cb: Function) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "Anonymous"; //开启img的“跨域”模式
  img.src = url;
  img.onload = () => {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx?.drawImage(img, 0, 0, img.width, img.height);
    const dataURL = canvas.toDataURL("image/jpeg", 1);
    cb(dataURL);
  };
}
