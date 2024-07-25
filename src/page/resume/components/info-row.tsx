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
      <div className="line"></div>
    </div>
  );
}
