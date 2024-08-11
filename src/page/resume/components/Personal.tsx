export default function Personal() {
  return (
    <div className="bg-slate-100 px-10 py-4 text-xs w-6/12">
      <div className="w-40 flex-1 text-base mb-2">
        <span>姓名：</span>
        <span>吴日聪</span>
      </div>
      <div className="flex justify-start">
        <div className="w-40 flex-1">
          <span>年龄：</span>
          <span>26</span>
        </div>
        <div className="w-40 flex-1">
          <span>电话：</span>
          <span>15070301734</span>
        </div>
      </div>

      <div className="flex justify-start">
        <div className="w-40 flex-1">
          <span>学校：</span>
          <span>江西师范大学</span>
        </div>
        <div className="w-40 flex-1">
          <span>学历：</span>
          <span>本科</span>
        </div>
      </div>

      <div className="flex justify-start">
        <div className="w-40 flex-1 whitespace-nowrap">
          <span>邮箱：</span>
          <span>15070301734@163.com</span>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="w-40 flex-1 whitespace-nowrap">
          <span>home-page：</span>
          <span>15070301734@163.com</span>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="w-40 flex-1 whitespace-nowrap">
          <span>github：</span>
          <a href="https://github.com/wuricong" target="_blank">
            https://github.com/wuricong
          </a>
        </div>
      </div>
    </div>
  );
}
