import dayjs from 'dayjs'

export default function Time() {
  return <div className='mb-4'>
    今天是{dayjs().format('YYYY-MM-DD')}
  </div>
}
