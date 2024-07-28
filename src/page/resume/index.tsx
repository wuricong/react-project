import "./index.less";
import Personal from "./components/Personal";
import InfoRow from "@/page/resume/components/info-row";

export default function ResumeTemplate() {
  return (
    <div className="bg-slate-200 w-full h-full flex justify-center overflow-auto">
      <div className="px-1 a4">
        <Title />
        <Personal />
        <InfoRow />
        <Company />
        <InfoRow />
        <MyTechnology />
        <InfoRow />
        <Project />
        <InfoRow />
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

function Company() {
  return (
    <div>
      <div>公司</div>
      <div>江苏百盛科技有限公司</div>
      <div>上海宝虎科技有限公司</div>
    </div>
  );
}

function MyTechnology() {
  return <div>个人技能</div>;
}

function Project() {
  return <div>项目经验</div>;
}
