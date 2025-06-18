import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Signup/Login'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HomePage from './components/HomePage/HomePage'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <Routes>
      <Route path='/login' element={
        <div>
          < ToastContainer position="top-right"/>
          <Login/>
        </div>
      }/>
      <Route path='/signup' element={
        <div>
          <ToastContainer position="top-right"/>
          <Signup/>
        </div>
      }/>
      <Route path='/' element={
        <div>
          <ToastContainer position="top-right"r/>
          <Navbar/>
          <HomePage/>
          <Footer/>
        </div>} />
      <Route path='/productpage' element={
        <div>
          <ToastContainer position="top-right"/>
          lol
        </div>
      }/>
    </Routes>
  )
}

export default App
