import React from 'react'
import './Login.css'
import logo from '../../assets/logo_icon.png'
const Login = () => {
  return (
    <div className="Login">
      
       <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
  <div className="Login-container  container p-5">
    <div className="row">
      <div className="col-lg-6 col-md-12">
        <div className="Login-left-content d-flex flex-column justify-content-center">
          <img className="h-auto mb-3" src={logo} alt="Google Logo" />

          <div className="signin-text ">
            <h1>Sign in</h1>
            <p>to continue to Gmail</p>
          </div>
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="Login-right-content d-flex flex-column justify-content-center">
          <form>
            <input className="form-control mb-3 mt-5" type="text" placeholder="Email or phone" />
            <div className="forgotEmail">
              <a className='fw-500' href="">Forgot Email ?</a>
            </div>
           
           <div className="note mt-5">
            <p>Not your computer? Use a private browsing window to sign in. <a className='noteLink' href="https://support.google.com/accounts/answer/2917834?visit_id=639040786014088172-3982469324&p=signin_privatebrowsing&hl=en&rd=1">Learn more about using Guest mode</a></p>
           </div>

            <div className=' footer d-flex justify-content-end gap-4 align-items-center  '>

           <div className="dropdown createBtn">
  <button
    className="btn btn-link p-0"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Create account
  </button>

  <ul className="dropdown-menu mt-3">
    <li>
      <a className="dropdown-item" href="#">
        For my personal use
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        For my child
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        For work or my business
      </a>
    </li>
  </ul>
</div>



              <div>
                <button className="btn nextBtn m-0" type="submit">
                  Next
                </button>
              </div>
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
