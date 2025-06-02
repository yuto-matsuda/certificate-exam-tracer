import Link from '../components/link'
import { DotList, ListItem } from '../components/list'

// export default function Home() {
//   return (
//     <div className='max-w-3/4 mx-auto mt-8
//     '>
//       <DotList color='black'>
//         <ListItem><Link to='/selection-sort'>選択ソート</Link></ListItem>
//         <ListItem><Link to='/bubble-sort'>バブルソート</Link></ListItem>
//         <ListItem><Link to='/insertion-sort'>挿入ソート</Link></ListItem>
//         <ListItem><Link to='/quick-sort'>クイックソート</Link></ListItem>
//         <ListItem><Link to='/bound-ball'>バウンドボール</Link></ListItem>
//         {/* <ListItem><Link to='/'></Link></ListItem> */}
//       </DotList>
//     </div>
//   )
// }

export default function Home() {
  return (
    <div className='max-w-3/4 mx-auto mt-8
    '>
      <DotList color='black'>
        <ListItem><Link to='/certificate-exam-tracer/selection-sort'>選択ソート</Link></ListItem>
        <ListItem><Link to='/certificate-exam-tracer/bubble-sort'>バブルソート</Link></ListItem>
        <ListItem><Link to='/certificate-exam-tracer/insertion-sort'>挿入ソート</Link></ListItem>
        <ListItem><Link to='/certificate-exam-tracer/quick-sort'>クイックソート</Link></ListItem>
        <ListItem><Link to='/certificate-exam-tracer/bound-ball'>バウンドボール</Link></ListItem>
        {/* <ListItem><Link to='/'></Link></ListItem> */}
      </DotList>
    </div>
  )
}