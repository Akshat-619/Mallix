import React from 'react'
import Logo from '../../assets/logo_icon.png'
import './Home.scss'

const Home = () => {
    return (
        <div className="Home p-2">
            <section className="Topbar d-flex align-items-center justify-content-between">
                
                <div className="d-flex align-items-center">
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="logoName">
                        Mallix
                    </div>
                </div>

                
                <div className="input-group flex-nowrap">
                    <input type="text" className="form-control" placeholder="Search" aria-label="Search" />
                    <span className="input-group-text" id="addon-wrapping"><i className="bi bi-search"></i></span>
                </div>
                  
            </section>
        </div>
    )
}

export default Home
