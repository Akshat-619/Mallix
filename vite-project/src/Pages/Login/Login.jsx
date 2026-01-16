import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo_icon.png'
import './Login.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Enter an email')
      return
    }

    setError('')
    // Navigate to password page with email state
    navigate('/password', { state: { email } })
  }

  return (
    <div className="Login">
      <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
        <div className="Login-container container p-5">
          <div className="row">

            <div className="col-lg-6 col-md-12">
              <div className="Login-left-content d-flex flex-column justify-content-center">
                <img src={logo} alt="Mallix Logo" />

                <div className="signin-text">
                  <h1>Welcome back</h1>
                  <p>Sign in to access your Mallix workspace</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="Login-right-content d-flex flex-column justify-content-center">
                <form onSubmit={handleSubmit} noValidate>

                  <input
                    className={`form-control mt-5 ${error ? 'input-error' : ''}`}
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                  />

                  {error && (
                    <div className="error-text">
                      <i className="bi bi-exclamation-circle"></i>
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="forgotEmail text-end mt-2">
                    <a href="#">Trouble signing in?</a>
                  </div>

                  <div className="note">
                    <p>
                      Accessing Mallix on a public device? Use private mode to stay secure.
                      <a className="noteLink" href="#">
                        Learn more about using Guest mode
                      </a>
                    </p>
                  </div>

                  <div className="footer d-flex justify-content-end gap-4 align-items-center">
                    <div className="dropdown createBtn mt-4">
                      <button
                        className="btn btn-link p-0"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        Create account
                      </button>

                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">For my personal use</a></li>
                        <li><a className="dropdown-item" href="#">For my child</a></li>
                        <li><a className="dropdown-item" href="#">For work or my business</a></li>
                      </ul>
                    </div>

                    <button className="btn nextBtn" type="submit">
                      Continue
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
