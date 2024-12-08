import AwaitButton from "@/components/await-button";
import { useEffect, useState } from "react";
import { requestApi } from "@/service";

function HostInfo() {
  const [list, setList] = useState([]);
  useEffect(() => {
    requestApi("/getInfoHost").then((res: any) => {
      setList(res.data);
    });
  }, []);
  const handleReq = async () => {
    const res: any = await requestApi("/getInfoHost");
    setList(res?.data);
  };
  return (
    <div className="my-2">
      <div className="flex items-center">
        <div className="mr-2 text-indigo-600">微博热搜</div>
        <AwaitButton req={handleReq}>刷新</AwaitButton>
      </div>

      <div className="ml-4 my-2 flex flex-wrap">
        {list.length
          ? list?.map((li: any) => (
              <a
                href={li.link}
                target="_blank"
                className="w-1/4 mr-4 mb-2"
                key={li.index}
              >
                {li?.context}
              </a>
            ))
          : "暂无数据"}
      </div>
    </div>
  );
}

export { HostInfo };
