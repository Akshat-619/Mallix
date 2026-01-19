import React from 'react'
import Logo from '../../assets/logo_icon.png'
import './Home.scss'

const Home = () => {
  return (
    <div className="Home p-2">
        <section className="Topbar d-flex align-items-center h-100">
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="logoName">
                Mallix
            </div>

            <div className="input-group flex-nowrap ms-auto">
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" />
                <span className="input-group-text" id="addon-wrapping">@</span>
            </div>
        </section>
    </div>
  )
}

export default Home
