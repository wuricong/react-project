/* 公历转农历代码思路：
1、建立农历年份查询表
2、计算输入公历日期与公历基准的相差天数
3、从农历基准开始遍历农历查询表，计算自农历基准之后每一年的天数，并用相差天数依次相减，确定农历年份
4、利用剩余相差天数以及农历每个月的天数确定农历月份
5、利用剩余相差天数确定农历哪一天 */

// 农历1949-2100年查询表
import {
  diZhi,
  lunarDay,
  lunarMonth,
  lunarYearArr,
  tianGan,
} from "@/utils/data.ts";

export function sloarToLunar(sy: any, sm: any, sd: any) {
  // 公历转农历函数
  function sloarToLunar(sy: any, sm: any, sd: any) {
    // 输入的月份减1处理
    sm -= 1;

    // 计算与公历基准的相差天数
    // Date.UTC()返回的是距离公历1970年1月1日的毫秒数,传入的月份需要减1
    let daySpan =
      (Date.UTC(sy, sm, sd) - Date.UTC(1949, 0, 29)) / (24 * 60 * 60 * 1000) +
      1;
    let ly = 0,
      lm,
      ld;
    // 确定输出的农历年份
    for (let j = 0; j < lunarYearArr.length; j++) {
      daySpan -= lunarYearDays(lunarYearArr[j]);
      if (daySpan <= 0) {
        ly = 1949 + j;
        // 获取农历年份确定后的剩余天数
        daySpan += lunarYearDays(lunarYearArr[j]);
        break;
      }
    }

    // 确定输出的农历月份
    for (let k = 0; k < lunarYearMonths(lunarYearArr[ly - 1949]).length; k++) {
      daySpan -= lunarYearMonths(lunarYearArr[ly - 1949])[k];
      if (daySpan <= 0) {
        // 有闰月时，月份的数组长度会变成13，因此，当闰月月份小于等于k时，lm不需要加1
        if (
          hasLeapMonth(lunarYearArr[ly - 1949]) &&
          hasLeapMonth(lunarYearArr[ly - 1949]) <= k
        ) {
          if (hasLeapMonth(lunarYearArr[ly - 1949]) < k) {
            lm = k;
          } else if (hasLeapMonth(lunarYearArr[ly - 1949]) === k) {
            lm = "闰" + k;
          } else {
            lm = k + 1;
          }
        } else {
          lm = k + 1;
        }
        // 获取农历月份确定后的剩余天数
        daySpan += lunarYearMonths(lunarYearArr[ly - 1949])[k];
        break;
      }
    }

    // 确定输出农历哪一天
    ld = daySpan;

    // 将计算出来的农历月份转换成汉字月份，闰月需要在前面加上闰字
    // if (
    //   hasLeapMonth(lunarYearArr[ly - 1949]) &&
    //   typeof lm === "string" &&
    //   lm.indexOf("闰") > -1
    // ) {
    //   lm = `闰${lunarMonth[/\d/.exec(lm) - 1]}`;
    // } else {
    //   lm = lunarMonth[lm - 1];
    // }

    // 将计算出来的农历年份转换为天干地支年
    // ly = getTianGan(ly) + getDiZhi(ly);

    // 将计算出来的农历天数转换成汉字
    if (ld < 11) {
      ld = `${lunarDay[10]}${lunarDay[ld - 1]}`;
    } else if (ld > 10 && ld < 20) {
      ld = `${lunarDay[9]}${lunarDay[ld - 11]}`;
    } else if (ld === 20) {
      ld = `${lunarDay[1]}${lunarDay[9]}`;
    } else if (ld > 20 && ld < 30) {
      ld = `${lunarDay[11]}${lunarDay[ld - 21]}`;
    } else if (ld === 30) {
      ld = `${lunarDay[2]}${lunarDay[9]}`;
    }

    return {
      lunarYear: ly,
      lunarMonth: lm,
      lunarDay: ld,
    };
  }

  // 计算农历年是否有闰月，参数为存储农历年的16进制
  // 农历年份信息用16进制存储，其中16进制的最后1位可以用于判断是否有闰月
  function hasLeapMonth(ly: any) {
    // 获取16进制的最后1位，需要用到&与运算符
    if (ly & 0xf) {
      return ly & 0xf;
    } else {
      return 0;
    }
  }

  // 如果有闰月，计算农历闰月天数，参数为存储农历年的16进制
  // 农历年份信息用16进制存储，其中16进制的第1位（0x除外）可以用于表示闰月是大月还是小月
  function leapMonthDays(ly: any) {
    if (hasLeapMonth(ly)) {
      // 获取16进制的第1位（0x除外）
      return ly & 0xf0000 ? 30 : 29;
    } else {
      return 0;
    }
  }

  // 计算农历一年的总天数，参数为存储农历年的16进制
  // 农历年份信息用16进制存储，其中16进制的第2-4位（0x除外）可以用于表示正常月是大月还是小月
  function lunarYearDays(ly: any) {
    let totalDays = 0;

    // 获取正常月的天数，并累加
    // 获取16进制的第2-4位，需要用到>>移位运算符
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      let monthDays = ly & i ? 30 : 29;
      totalDays += monthDays;
    }
    // 如果有闰月，需要把闰月的天数加上
    if (hasLeapMonth(ly)) {
      totalDays += leapMonthDays(ly);
    }

    return totalDays;
  }

  // 获取农历每个月的天数
  // 参数需传入16进制数值
  function lunarYearMonths(ly: any) {
    let monthArr = [];

    // 获取正常月的天数，并添加到monthArr数组中
    // 获取16进制的第2-4位，需要用到>>移位运算符
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      monthArr.push(ly & i ? 30 : 29);
    }
    // 如果有闰月，需要把闰月的天数加上
    if (hasLeapMonth(ly)) {
      monthArr.splice(hasLeapMonth(ly), 0, leapMonthDays(ly));
    }

    return monthArr;
  }

  // 将农历年转换为天干，参数为农历年
  function getTianGan(ly: any) {
    let tianGanKey = (ly - 3) % 10;
    if (tianGanKey === 0) tianGanKey = 10;
    return tianGan[tianGanKey - 1];
  }

  // 将农历年转换为地支，参数为农历年
  function getDiZhi(ly: any) {
    let diZhiKey = (ly - 3) % 12;
    if (diZhiKey === 0) diZhiKey = 12;
    return diZhi[diZhiKey - 1];
  }

  return sloarToLunar(sy, sm, sd);
}
