import AwaitButton from "@/components/await-button";

function HostInfo({list = []}: { list?: Array<any> }) {
  const handleReq = async () => {
    console.log(1)
  }
  return <div className='my-2'>
    <div className='flex items-center'>
      <div className='mr-2'>今日热搜(实时)</div>
      <AwaitButton req={handleReq}>刷新</AwaitButton>
    </div>

    <div className='ml-4 my-2'>
      {list.length ? list?.map(li => <div key={li.index}>{li?.context}</div>) : '暂无数据'}
    </div>
  </div>
}

export {HostInfo}
