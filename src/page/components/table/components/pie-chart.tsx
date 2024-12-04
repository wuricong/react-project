import { Pie } from "@ant-design/plots";

function PieChart({ list = [] }: any) {
  const handleAnalyse = (_list: any) => {
    const arr: any = [];
    _list.forEach((item: any) => {
      const result = arr.find((itemA: any) => itemA?.title === item.industry);
      if (!result) {
        arr.push({ title: item.industry, num: 1, children: [item] });
      } else {
        result.num++;
        result.children.push(item);
      }
    });
    return arr;
  };

  const config = {
    data: handleAnalyse(list)?.map((item: any) => ({
      type: item.title,
      value: item.num,
    })),
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
}

export default PieChart;
