import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Signup/Login'
import Navbar from './components/Navbar/Navbar'
import ProductPage from './components/ProductPage/ProductPage'
import Footer from './components/Footer/Footer'
import Try1 from './components/try/try1'
import Filter from './components/Filter/Filter'
import HomePage from './components/HomePage/HomePage'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={
        <div>
          <ToastContainer/>
          <Navbar/>
          <HomePage/>
          <Footer/>
        </div>} />
      <Route path='/productpage' element={<Try1/>}/>
    </Routes>
  )
}

export default App
