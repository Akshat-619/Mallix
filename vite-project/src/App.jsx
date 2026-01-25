import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Password from './Pages/Password/Password'
import Signup from './Pages/Signup/Signup'
import Home from './Pages/Home/Home'
import EmailView from './Pages/EmailView/EmailView'

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<Password />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/email/:id" element={<EmailView />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
