import React from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="bg-[#09090b] text-white w-screen h-screen flex flex-col">
      <Header />
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
