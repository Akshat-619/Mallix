import React from 'react'
import Logo from '../../assets/logo_icon.png'
import './Home.scss'

const Home = () => {
    return (
        <div className="Home p-2">
            <section className="Topbar d-flex align-items-center">
                
                <div className="d-flex align-items-center">
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="logoName">
                        Mallix
                    </div>
                </div>

                
                <div className="input-group flex-nowrap mx-auto">
                    <input type="text" className="form-control" placeholder="Search" aria-label="Search" />
                    <span className="input-group-text" id="addon-wrapping"><i className="bi bi-search"></i></span>
                </div>
                  
                  <div className="Topbar-icons">
                    <i className="bi bi-question-circle-fill" data-tooltip="Support"></i>
                    <i className="bi bi-gear-fill" data-tooltip="Settings"></i>
                    <i className="bi bi-alexa" data-tooltip="Try Alexa"></i>
                    <i className="bi bi-grid-3x3-gap-fill" data-tooltip="Mallix Apps"></i>
                    <i className="bi bi-person-circle" data-tooltip="Profile"></i>
                  </div>
             </section>
        </div>
    )
}

export default Home
