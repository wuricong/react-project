import dayjs from "dayjs";

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

/**
 * 获取上一月份的最后一天
 * @param month 传入的月份
 * */
export function getPrevMonthEndDay(month = null) {
  const _month = month ? month : dayjs().format("MM");
  return dayjs(_month).add(-1, "month").endOf("month").format("DD");
}

/**
 * 获取天数间隔
 * @param num 传入的月份
 * @param sort 排序方式
 * */
export function getDaysMonth(num: number, sort: number) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(i + 1);
  }
  console.log("num, sort", num, sort);
  return arr;
}
