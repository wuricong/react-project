import "./index.less";
import Personal from "./components/Personal";

export default function ResumeTemplate() {
  return (
    <div className="bg-slate-200 w-full h-full flex justify-center">
      <div className="a4">
        <Title />
        <Personal />
      </div>
    </div>
  );
}

function Title() {
  return (
    <div>
      <div className="line-row text-white bg-slate-400 flex items-center">
        <div className="left"></div>
        <div className="ml-1.5">个人简历</div>
      </div>
    </div>
  );
}
