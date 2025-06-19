import "./index.less";
import Personal from "./components/Personal";
import InfoRow from "@/page/resume/components/info-row";
import { Tag } from "antd";

export default function ResumeTemplate() {
  return (
    <div className="bg-slate-200 w-full flex flex-col justify-center items-center overflow-auto">
      <div className="px-1 a4 my-4">
        <Title />
        <Personal />
        <InfoRow text="公司" />
        <Company />
        <InfoRow text="个人技能" />
        <MyTechnology />
        <InfoRow text="项目经验" />
        <Project />
      </div>
      <div className="px-1 a4 my-4">
        <InfoRow text="兴趣爱好" />
      </div>
    </div>
  );
}

function Title() {
  return (
    <div>
      <div className="line-row text-white bg-slate-400 flex items-center">
        <i className="iconfont icon-denglu mx-4"></i>
        <div className="left"></div>
        <div className="ml-2">个人简历</div>
      </div>
    </div>
  );
}

function Company() {
  return (
    <div>
      <div className="text-base font-bold text-center pb-2">
        江苏百盛科技有限公司
      </div>
      <p className="text-sm mb-2 px-4">
        参与 Web
        应用的开发，与服务端开发人员进行应用及系统整合，调试网站页面在不同浏览器下的兼容性，配合项目经理和设计负责对界面进行实现和优化等。
      </p>
      <div className="text-base font-bold text-center pb-2">
        上海宝虎科技有限公司
      </div>
      <p className="text-sm px-4">
        负责公司前端项目的开发和维护，设计编写可复用的页面组件，对产品的原型及UI进行逻辑梳理，
        对项目可扩展性分析以及配合服务端进行接口联调，参与项目后续版本的迭代与优化。
      </p>
    </div>
  );
}

function MyTechnology() {
  return (
    <>
      <div className="pl-4">
        <Tag color="#111a7b">electron</Tag>
        <Tag color="#111a7b">react</Tag>
        <Tag color="#111a7b">vue</Tag>
        <Tag color="#111a7b">node</Tag>
      </div>
      <ul className="font-bold pl-8 list-disc">
        <li>熟练掌握ES6语法，对Promise，原型，闭包有深度了解</li>
        <li>熟练使用Vue2/3及其工具链进行需求编写，功能实现</li>
        <li>熟练使用Uni-app，Taro结合UI组件库进行跨端开发</li>
        <li>熟练使用React进行项目开发及维护</li>
        <li>熟悉前端工程化，并使用Webpack，Vite进行项目基础搭建</li>
        <li>
          熟悉Node.Js、并使用Electron开发过桌面端应用熟悉Node.Js、并使用Electron开发过桌面端应用
        </li>
        <li>熟悉Python语言，并使用其制作脚本与Node进行交互</li>
        {/*<li>对大模型有一定的了解，使用GPT-4解决日常工作中的一些问题</li>*/}
      </ul>
    </>
  );
}

function Project() {
  return (
    <div>
      <div className="text-base font-bold pb-1">一、eSource前后台系统</div>
      <div className="pl-2">
        <p className="text-sm font-bold">
          项目描述：该系统是服务于医药公司临床试验的数据可视化大型SASS应用，实现研究者信息采集，
          受试者数据上报，系统中包含访视，质疑，核查，稽查轨迹,
          报表中心等多个模块。
        </p>
        <p className="text-sm font-bold py-1">
          技术栈：Webpack + Vue3 + Element + Axios + Typescript
        </p>
        <p className="text-sm">
          <span>项目职责：</span>
          <div className="ml-4">
            <div>
              参与项目评审，从技术角度评估需求的合理性，结合UI以及产品展示对应的界面效果；
            </div>
            <div>利用 Vue-cli 搭建项目，搭配 Element UI 完成前端项目基建；</div>
            <div>使用Vuex管理全局状态，实现登录状态Token的持久化；</div>
            <div>
              封装全局请求的方法，实现自定义请求配置，请求异常全局捕获；
            </div>
            <div>
              利用递归进行树形结构转换，实现不同层级的树形图编辑和展示；
            </div>
            <div>封装自定义指令实现，input输入值格式化，table自适应宽高；</div>
            <div>
              优化数据加载以及展现，提升页面加载速度，对所开发的页面性能进行优化和维护；
            </div>
            <div>通过覆写组件更改一些UI组件的默认行为；</div>
            <div>
              开发高难度的可配置报表模版，编写计算汇总，数据结构转换与渲染的算法；
            </div>
          </div>
        </p>
      </div>
    </div>
  );
}
