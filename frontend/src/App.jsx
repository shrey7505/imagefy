import React, { useContext } from 'react'
import Home from './pages/Home'
import BuyCradit from './pages/BuyCradit'
import Result from './pages/Result'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContect'
  import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  const { showLogin } = useContext(AppContext);
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <ToastContainer position='bottom-right' />
      <Navigation/>
      {showLogin && <Login/>}
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-credit" element={<BuyCradit />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer/>
      
    </div>
  )
}

export default App