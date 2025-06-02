import { HashRouter, Routes, Route } from 'react-router'
import Home from './pages/home'
import Header from './components/header'
import SelectionSort from './pages/selection-sort'
import BubbleSort from './pages/bubble-sort'
import InsertionSort from './pages/insertion-sort'
import QuickSort from './pages/quick-sort'
// import BoundBall from './pages/bound-ball'


// github pagesようにbaseを追加したから、ルートでのルーティングが使えない
// export default function App() {
//   return (
//     <>
//       <Header />
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/selection-sort' element={<SelectionSort />} />
//           <Route path='/bubble-sort'    element={<BubbleSort />} />
//           <Route path='/insertion-sort' element={<InsertionSort />} />
//           <Route path='/quick-sort'     element={<QuickSort />} />
//           {/* <Route path='/bound-ball'     element={<BoundBall />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

export default function App() {
  return (
    <>
      <Header />
      <HashRouter>
        <Routes>
          <Route path='/certificate-exam-tracer/' element={<Home />} />
          <Route path='/certificate-exam-tracer/selection-sort' element={<SelectionSort />} />
          <Route path='/certificate-exam-tracer/bubble-sort'    element={<BubbleSort />} />
          <Route path='/certificate-exam-tracer/insertion-sort' element={<InsertionSort />} />
          <Route path='/certificate-exam-tracer/quick-sort'     element={<QuickSort />} />
          {/* <Route path='/bound-ball'     element={<BoundBall />} /> */}
        </Routes>
      </HashRouter>
    </>
  )
}