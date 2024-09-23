import React from "react";
import "@/styles/info-row.less";

interface param {
  text?: string;
  icon?: React.FC;
}

export default function ({ text, icon }: param) {
  console.log("text, icon", text, icon);
  return (
    <div>
      <div className="line flex mb-2">
        <div className="mt-auto ml-1 font-bold">{text}</div>
      </div>
    </div>
  );
}
