import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Password from './Pages/Login/Signup/Password'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/password" element={<Password />} />
        <Route path="/gmail-clone" element={<Navigate to="/" replace />} />
        <Route path="/gmail-clone/" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
