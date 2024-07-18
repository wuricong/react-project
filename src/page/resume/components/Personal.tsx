export default function Personal() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-40">
          <span>姓名：</span>
          <span>吴日聪</span>
        </div>
        <div className="w-40">
          <span>年龄：</span>
          <span>26</span>
        </div>
        <div className="w-40">
          <span>籍贯：</span>
          <span>江西上饶</span>
        </div>
      </div>

      <div className="flex">
        <div>学历</div>
        <div>学校</div>
        <div>专业</div>
      </div>

      <div className="flex">
        <div>岗位</div>
        <div>电话</div>
        <div>邮箱</div>
      </div>
    </div>
  );
}
