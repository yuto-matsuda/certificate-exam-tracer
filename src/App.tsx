import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/home'
import Header from './components/header'
import SelectionSort from './pages/selection-sort'
import BubbleSort from './pages/bubble-sort'
import InsertionSort from './pages/insertion-sort'
import QuickSort from './pages/quick-sort'
// import BoundBall from './pages/bound-ball'

export default function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/selection-sort' element={<SelectionSort />} />
          <Route path='/bubble-sort'    element={<BubbleSort />} />
          <Route path='/insertion-sort' element={<InsertionSort />} />
          <Route path='/quick-sort'     element={<QuickSort />} />
          {/* <Route path='/bound-ball'     element={<BoundBall />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}