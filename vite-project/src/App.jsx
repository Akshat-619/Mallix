import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Password from './Pages/Password/Password'
import Signup from './Pages/Signup/Signup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/password" element={<Password />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
