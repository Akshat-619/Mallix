import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '@/assets/logo_icon.png'
import './Password.scss'

const Password = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation()
  
  // Get email from navigation state
  const email = location.state?.email

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!password.trim()) {
      setError('Enter your password')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }


    setError('')
   
  }

  return (
    <div className="Password">
      <div className="password-page d-flex align-items-center justify-content-center min-vh-100">
        <div className="Password-container container p-5">
          <div className="row h-100">

            {/* LEFT SIDE */}
            <div className="col-lg-6 col-md-12">
              <div className="Password-left-content d-flex flex-column justify-content-center h-100">
                <img src={logo} alt="Mallix Logo" />

                <div className="signin-text">
                  <h1>Enter Password</h1>

                  {email && (
                    <div className="userEmail mt-4">
                      <span>
                        <i className="bi bi-person-circle me-2"></i>
                        {email}
                        <i className="bi bi-caret-down-fill ms-2"></i>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

         
            <div className="col-lg-6 col-md-12">
              <div className="Password-right-content">

                <div className="note">
                  <p>To continue, please verify your identity.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>

                  <div className="form-floating position-relative mb-3">
  <input
    type={showPassword ? 'text' : 'password'}
    className={`form-control ${error ? 'input-error' : ''}`}
    id="floatingPassword"
    placeholder="Password"
    value={password}
    onChange={(e) => {
      setPassword(e.target.value)
      if (error) setError('')
    }}
    autoComplete="current-password"
  />

  <label htmlFor="floatingPassword">Password</label>

  {password && (
    <button
      type="button"
      className="password-toggle-btn"
      onClick={() => setShowPassword(!showPassword)}
    >
      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
    </button>
  )}
</div>


                  {error && (
                    <div className="error-text">
                      <i className="bi bi-exclamation-circle"></i>
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="forgotEmail text-end mt-2">
                    <a href="#">Forgot password?</a>
                  </div>

                 

                </form>
                   <div className="footer d-flex justify-content-end">
                    <button className="btn nextBtn" type="submit">
                      Login
                    </button>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Password
