import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './componet/Dashboard'
import Header from './componet/Header'
import Slidebar from './componet/Slidebar'
import Add from './componet/Add'
import View from './componet/View'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <>
      <ToastContainer/>
      <Header />
      <div className='flex flex-wrap'>
        <div className='w-1/5 h-[90vh]'>
          <Slidebar />
        </div>
        <div className='w-4/5 h-[90vh] overflow-x-hidden overflow-scroll  p-[20px]'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addcon" element={<Add />} />
            <Route path="/viewcon" element={<View />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
