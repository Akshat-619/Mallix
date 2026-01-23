import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import EmailSection from '../../Components/EmailSection/EmailSection';
import Logo from '../../assets/logo_icon.png';
import './Home.scss';

const Home = () => {
    const [showSupportDrawer, setShowSupportDrawer] = useState(false)
    const [showAlexaDrawer, setShowAlexaDrawer] = useState(false)
    const [showSettingsDrawer, setShowSettingsDrawer] = useState(false)
    const [showAppsDrawer, setShowAppsDrawer] = useState(false)
    const [showProfileDrawer, setShowProfileDrawer] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showComposeModal, setShowComposeModal] = useState(false)
    
    // Compose panel state
    const [composeData, setComposeData] = useState({
        recipients: '',
        subject: '',
        message: ''
    })
    
    const [composeErrors, setComposeErrors] = useState({
        recipients: '',
        subject: '',
        message: ''
    })
    
    const [showSubjectConfirm, setShowSubjectConfirm] = useState(false)
    const [customAlert, setCustomAlert] = useState({ show: false, message: '', type: 'error' })
    
    const supportDropdownRef = useRef(null)
    const alexaDropdownRef = useRef(null)
    const settingsDropdownRef = useRef(null)
    const appsDropdownRef = useRef(null)
    const profileDropdownRef = useRef(null)

    // Compose panel handlers
    const showCustomAlert = (message, type = 'error') => {
        setCustomAlert({ show: true, message, type })
        setTimeout(() => {
            setCustomAlert({ show: false, message: '', type: 'error' })
        }, 3000)
    }

    const handleComposeChange = (field, value) => {
        setComposeData(prev => ({
            ...prev,
            [field]: value
        }))
        
        // Clear error for this field when user starts typing
        if (value.trim()) {
            setComposeErrors(prev => ({
                ...prev,
                [field]: ''
            }))
        }
        
        // Real-time email validation for recipients field
        if (field === 'recipients') {
            // Clear error if field is empty
            if (!value.trim()) {
                setComposeErrors(prev => ({
                    ...prev,
                    recipients: ''
                }))
                return
            }
            
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            const emails = value.split(',').map(email => email.trim())
            
            // Check for invalid emails
            const invalidEmails = emails.filter(email => email && !emailRegex.test(email))
            if (invalidEmails.length > 0) {
                setComposeErrors(prev => ({
                    ...prev,
                    recipients: `Invalid: ${invalidEmails.join(', ')}`
                }))
            } else {
                setComposeErrors(prev => ({
                    ...prev,
                    recipients: ''
                }))
            }
        }
    }
    
    const handleSendEmail = () => {
        // Reset errors
        setComposeErrors({
            recipients: '',
            subject: '',
            message: ''
        })
        
        // Check if recipients is empty
        if (!composeData.recipients.trim()) {
            showCustomAlert('Please fill in all required fields')
            setComposeErrors(prev => ({
                ...prev,
                recipients: 'Enter the receiver email'
            }))
            return
        }
        
        // Check if message is empty
        if (!composeData.message.trim()) {
            showCustomAlert('Please fill in all required fields')
            setComposeErrors(prev => ({
                ...prev,
                message: 'Cant send with body empty'
            }))
            return
        }
        
        // Enhanced email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const emails = composeData.recipients.split(',').map(email => email.trim())
        const validEmails = emails.every(email => emailRegex.test(email))
        
        // Check for empty emails
        const emptyEmails = emails.filter(email => !email)
        if (emptyEmails.length > 0) {
            showCustomAlert('Please remove empty email addresses')
            setComposeErrors(prev => ({
                ...prev,
                recipients: 'Empty email addresses found'
            }))
            return
        }
        
        // Check for invalid emails
        const invalidEmails = emails.filter(email => !emailRegex.test(email))
        if (invalidEmails.length > 0) {
            showCustomAlert(`Invalid email format: ${invalidEmails.join(', ')}`)
            setComposeErrors(prev => ({
                ...prev,
                recipients: `Invalid emails: ${invalidEmails.join(', ')}`
            }))
            return
        }
        
        // Check for duplicate emails
        const uniqueEmails = [...new Set(emails)]
        if (uniqueEmails.length !== emails.length) {
            showCustomAlert('Duplicate email addresses detected')
            setComposeErrors(prev => ({
                ...prev,
                recipients: 'Remove duplicate email addresses'
            }))
            return
        }
        
        // Limit number of recipients
        if (emails.length > 10) {
            showCustomAlert('Maximum 10 recipients allowed')
            setComposeErrors(prev => ({
                ...prev,
                recipients: 'Too many recipients (max 10)'
            }))
            return
        }
        
        // Check if subject is empty and show confirmation
        if (!composeData.subject.trim()) {
            setShowSubjectConfirm(true)
            return
        }
        
        // Send email
        sendEmail()
    }
    
    const sendEmail = () => {
        // Simulate sending email
        console.log('Sending email:', composeData)
        showCustomAlert('Email sent successfully!', 'success')
        
        // Reset form and close panel
        setComposeData({
            recipients: '',
            subject: '',
            message: ''
        })
        setComposeErrors({
            recipients: '',
            subject: '',
            message: ''
        })
        setShowComposeModal(false)
        setShowSubjectConfirm(false)
    }
    
    const handleMinimizePanel = () => {
        setShowComposeModal(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (supportDropdownRef.current && !supportDropdownRef.current.contains(event.target)) {
                setShowSupportDrawer(false)
            }
            if (alexaDropdownRef.current && !alexaDropdownRef.current.contains(event.target)) {
                setShowAlexaDrawer(false)
            }
            if (appsDropdownRef.current && !appsDropdownRef.current.contains(event.target)) {
                setShowAppsDrawer(false)
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setShowProfileDrawer(false)
            }
            // Close mobile menu when clicking outside
            if (showMobileMenu && !event.target.closest('.mobile-menu-dropdown') && !event.target.closest('.mobile-hamburger')) {
                setShowMobileMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showMobileMenu])

    return (
        <div className="Home">
            <section className="Topbar d-flex align-items-center">
            
            <div className="d-flex align-items-center">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="logoName">
                    Mallix
                </div>
            </div>

            <div className="input-group flex-nowrap mx-auto d-none d-md-flex">
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" />
                <span className="input-group-text"><i className="bi bi-search"></i></span>
            </div>
              
              <div className="Topbar-icons d-none d-md-flex">
                <button
                    className="btn btn-link p-0"
                    type="button"
                    onClick={() => setShowSupportDrawer(!showSupportDrawer)}
                >
                    <i className="bi bi-question-circle-fill" data-tooltip="Support"></i>
                </button>
                <button
                    className="btn btn-link p-0"
                    type="button"
                    onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
                >
                    <i className="bi bi-gear-fill" data-tooltip="Settings"></i>
                </button>
                <button
                    className="btn btn-link p-0"
                    type="button"
                    onClick={() => setShowAlexaDrawer(!showAlexaDrawer)}
                >
                    <div className="alexa-wrapper" data-tooltip="Try Alexa">
                        <i className="bi bi-alexa"></i>
                    </div>
                </button>
                <button
                    className="btn btn-link p-0"
                    type="button"
                    onClick={() => setShowAppsDrawer(!showAppsDrawer)}
                >
                    <i className="bi bi-grid-3x3-gap-fill" data-tooltip="Mallix Apps"></i>
                </button>
                <button
                    className="btn btn-link p-0"
                    type="button"
                    onClick={() => setShowProfileDrawer(!showProfileDrawer)}
                >
                    <i className="bi bi-person-circle" data-tooltip="Profile"></i>
                </button>
              </div>

              {/* Mobile Hamburger Menu */}
              <div className="d-md-none">
                <button
                    className="btn btn-link p-0 mobile-hamburger"
                    type="button"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    <i className="bi bi-list"></i>
                </button>
              </div>
         </section>

            <main className="main-content">
                <div className="content-wrapper">
                    <Sidebar onComposeClick={() => setShowComposeModal(true)} />
                    <EmailSection />
                </div>

            {/* Mobile Menu Dropdown */}
            <div className={`mobile-menu-dropdown ${showMobileMenu ? 'show' : ''}`} onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setShowMobileMenu(false)
                }
            }}>
                <div className="mobile-menu-header">
                    <h5 className="mb-0">Menu</h5>
                    <button 
                        className="btn-close"
                        onClick={() => setShowMobileMenu(false)}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="mobile-menu-content">
                    <div className="mobile-menu-section">
                        <h6 className="mobile-menu-title">Support</h6>
                        <ul className="mobile-menu-list">
                            <li><button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); setShowSupportDrawer(true); }}><i className="bi bi-question-circle me-2"></i> Help</button></li>
                            <li><button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); setShowSupportDrawer(true); }}><i className="bi bi-mortarboard me-2"></i> Training</button></li>
                        </ul>
                    </div>
                    <div className="mobile-menu-section">
                        <h6 className="mobile-menu-title">Settings</h6>
                        <ul className="mobile-menu-list">
                            <li><button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); setShowSettingsDrawer(true); }}><i className="bi bi-gear me-2"></i> Settings</button></li>
                            <li><button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); setShowSettingsDrawer(true); }}><i className="bi bi-moon me-2"></i> Appearance</button></li>
                            <li><button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); setShowSettingsDrawer(true); }}><i className="bi bi-bell me-2"></i> Notifications</button></li>
                        </ul>
                    </div>
                    <div className="mobile-menu-section">
                        <h6 className="mobile-menu-title">Apps</h6>
                        <ul className="mobile-menu-list">
                            <li><button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); setShowAppsDrawer(true); }}><i className="bi bi-grid-3x3-gap me-2"></i> Mallix Apps</button></li>
                        </ul>
                    </div>
                    <div className="mobile-menu-section">
                        <h6 className="mobile-menu-title">Profile</h6>
                        <ul className="mobile-menu-list">
                            <li><button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); setShowProfileDrawer(true); }}><i className="bi bi-person-circle me-2"></i> Profile</button></li>
                            <li><button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); setShowProfileDrawer(true); }}><i className="bi bi-box-arrow-right me-2"></i> Sign Out</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Support Drawer */}
            <div className={`support-drawer settings-drawer ${showSupportDrawer ? 'show' : ''}`} ref={supportDropdownRef}>
                <div className="drawer-header">
                    <h5 className="mb-0"><i className="bi bi-question-circle-fill me-2"></i>Support</h5>
                    <button 
                        className="btn-close"
                        onClick={() => setShowSupportDrawer(false)}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="drawer-content">
                    <div className="settings-section">
                        <h6 className="section-title">Help & Support</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-question-circle me-2"></i> Help</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-mortarboard me-2"></i> Training</a></li>
                        </ul>
                    </div>

                    <div className="settings-section">
                        <h6 className="section-title">Feedback</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-chat-dots me-2"></i> Send Feed back to Mallix</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Alexa Drawer */}
            <div className={`alexa-drawer settings-drawer ${showAlexaDrawer ? 'show' : ''}`} ref={alexaDropdownRef}>
                <div className="drawer-header">
                    <h5 className="mb-0"><i className="bi bi-alexa me-2"></i>Try Alexa</h5>
                    <button 
                        className="btn-close"
                        onClick={() => setShowAlexaDrawer(false)}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="drawer-content">
                    <div className="settings-section">
                        <h6 className="section-title">Gmail & Docs</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-envelope me-2"></i> Create drafts in Gmail</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-file-earmark-text me-2"></i> Generate content in Docs</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-table me-2"></i> Plan projects in Sheets</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-image me-2"></i> Generate images in Slides</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-camera-video me-2"></i> Enhanced meetings in Meet</a></li>
                        </ul>
                    </div>

                    <div className="settings-section">
                        <h6 className="section-title">AI Pro Features</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-cpu me-2"></i> Gemini Pro access</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-hdd me-2"></i> 2 TB storage</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-lightning-charge me-2"></i> Advanced AI models</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-rocket-takeoff me-2"></i> Power up productivity</a></li>
                        </ul>
                    </div>

                    <div className="settings-section">
                        <h6 className="section-title">Productivity Tools</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-magic me-2"></i> Smart suggestions</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-lightbulb me-2"></i> Quick insights</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-speedometer2 me-2"></i> Auto-complete tasks</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-graph-up me-2"></i> Performance analytics</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Settings Drawer */}
            <div className={`settings-drawer ${showSettingsDrawer ? 'show' : ''}`}>
                <div className="drawer-header">
                    <h5 className="mb-0"><i className="bi bi-gear-fill me-2"></i>Settings</h5>
                    <button 
                        className="btn-close"
                        onClick={() => setShowSettingsDrawer(false)}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="drawer-content">
                    <div className="settings-section">
                        <h6 className="section-title">View & Layout</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-envelope me-2"></i> Inbox Density</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-layout-text-window me-2"></i> View & Layout</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-eye me-2"></i> Reading Pane</a></li>
                        </ul>
                    </div>

                    <div className="settings-section">
                        <h6 className="section-title">Appearance</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-moon me-2"></i> Appearance</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-bell me-2"></i> Notifications</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-chat-dots me-2"></i> Message Sound</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-volume-mute me-2"></i> Mute Conversations</a></li>
                        </ul>
                    </div>

                    <div className="settings-section">
                        <h6 className="section-title">Inbox Settings</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-inbox me-2"></i> Show Unread First</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-people me-2"></i> Group Messages by Sender</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-archive me-2"></i> Auto-archive Read Messages</a></li>
                        </ul>
                    </div>

                    <div className="settings-section">
                        <h6 className="section-title">Search & Filters</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-search me-2"></i> Search & Filters</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-star me-2"></i> Highlight Important Messages</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-eye-slash me-2"></i> Hide Low-Priority Messages</a></li>
                        </ul>
                    </div>

                    <div className="settings-section">
                        <h6 className="section-title">Productivity</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-lightning me-2"></i> Keyboard Shortcuts</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-reply me-2"></i> Quick Reply</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-file-earmark me-2"></i> Auto-save Drafts</a></li>
                        </ul>
                    </div>

                    <div className="settings-section">
                        <h6 className="section-title">Account</h6>
                        <ul className="settings-list">
                            <li><a href="#" className="settings-item"><i className="bi bi-gear me-2"></i> Inbox Settings</a></li>
                            <li><a href="#" className="settings-item"><i className="bi bi-shield-check me-2"></i> Privacy & Security</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Google Apps Drawer */}
            <div className={`apps-drawer settings-drawer ${showAppsDrawer ? 'show' : ''}`} ref={appsDropdownRef}>
                <div className="drawer-header">
                    <h5 className="mb-0"><i className="bi bi-grid-3x3-gap-fill me-2"></i>Mallix Apps</h5>
                    <button 
                        className="btn-close"
                        onClick={() => setShowAppsDrawer(false)}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="drawer-content">
                    <div className="apps-search">
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            className="apps-search-input"
                            placeholder="Search apps"
                            aria-label="Search apps"
                        />
                    </div>

                    <div className="apps-section">
                        <h6 className="section-title">Communication</h6>
                        <div className="apps-grid">
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-envelope"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Mail</div>
                                    <div className="app-desc">Email & messaging</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-chat-dots"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Chat</div>
                                    <div className="app-desc">Team messaging</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-camera-video"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Meet</div>
                                    <div className="app-desc">Video meetings</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="apps-section">
                        <h6 className="section-title">Productivity</h6>
                        <div className="apps-grid">
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-cloud"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Drive</div>
                                    <div className="app-desc">Cloud storage</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-file-text"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Docs</div>
                                    <div className="app-desc">Documents</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-table"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Sheets</div>
                                    <div className="app-desc">Spreadsheets</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-easel"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Slides</div>
                                    <div className="app-desc">Presentations</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-journal-text"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Keep</div>
                                    <div className="app-desc">Notes & lists</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-check2-square"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Tasks</div>
                                    <div className="app-desc">Task management</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="apps-section">
                        <h6 className="section-title">Organization</h6>
                        <div className="apps-grid">
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-calendar-event"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Calendar</div>
                                    <div className="app-desc">Schedule & events</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-ui-checks"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Forms</div>
                                    <div className="app-desc">Surveys & forms</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-globe"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Maps</div>
                                    <div className="app-desc">Location services</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="apps-section">
                        <h6 className="section-title">Recent</h6>
                        <div className="apps-grid">
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-file-text"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Project Outline</div>
                                    <div className="app-desc">Docs · Updated 10 min ago</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-table"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Sprint Tracker</div>
                                    <div className="app-desc">Sheets · Opened today</div>
                                </div>
                            </div>
                            <div className="app-card">
                                <div className="app-icon">
                                    <i className="bi bi-easel"></i>
                                </div>
                                <div className="app-info">
                                    <div className="app-name">Marketing Deck</div>
                                    <div className="app-desc">Slides · Shared with team</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="apps-footer">
                        <div className="footer-section">
                            <h6 className="footer-title">Quick Actions</h6>
                            <div className="quick-actions">
                                <div className="row g-2">
                                    <div className="col-md-4 col-12">
                                        <button className="action-btn">
                                            <i className="bi bi-plus-circle"></i>
                                            <span>Create New</span>
                                        </button>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <button className="action-btn">
                                            <i className="bi bi-clock-history"></i>
                                            <span>Recent</span>
                                        </button>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <button className="action-btn">
                                            <i className="bi bi-star"></i>
                                            <span>Starred</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-section">
                            <h6 className="footer-title">Storage</h6>
                            <div className="storage-info">
                                <div className="storage-bar">
                                    <div className="storage-used"></div>
                                </div>
                                <div className="storage-text">
                                    <span>7.2 GB of 15 GB used</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Drawer */}
            <div className={`profile-drawer settings-drawer ${showProfileDrawer ? 'show' : ''}`} ref={profileDropdownRef}>
                <div className="drawer-header">
                    <h5 className="mb-0"><i className="bi bi-person-circle me-2"></i>Profile</h5>
                    <button 
                        className="btn-close"
                        onClick={() => setShowProfileDrawer(false)}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="drawer-content">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <i className="bi bi-person-circle"></i>
                        </div>
                        <div className="profile-info">
                            <div className="profile-name">John Doe</div>
                            <div className="profile-email">john.doe@mallix.com</div>
                            <div className="profile-manage">
                                <a href="#" className="manage-link">Manage your Google Account</a>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <div className="row g-3">
                            <div className="col-md-12">
                                <div className="profile-item">
                                    <i className="bi bi-person-badge"></i>
                                    <div className="profile-item-content">
                                        <div className="profile-item-title">Your personal info</div>
                                        <div className="profile-item-subtitle">Name, photo, contact info</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="profile-item">
                                    <i className="bi bi-shield-check"></i>
                                    <div className="profile-item-content">
                                        <div className="profile-item-title">Security</div>
                                        <div className="profile-item-subtitle">Password, 2-step verification</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="profile-item">
                                    <i className="bi bi-bell"></i>
                                    <div className="profile-item-content">
                                        <div className="profile-item-title">Notifications</div>
                                        <div className="profile-item-subtitle">Alerts, sounds, notifications</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <div className="row g-3">
                            <div className="col-md-12">
                                <div className="profile-item">
                                    <i className="bi bi-people"></i>
                                    <div className="profile-item-content">
                                        <div className="profile-item-title">People & sharing</div>
                                        <div className="profile-item-subtitle">Contacts, sharing, blocked</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="profile-item">
                                    <i className="bi bi-translate"></i>
                                    <div className="profile-item-content">
                                        <div className="profile-item-title">Language & input</div>
                                        <div className="profile-item-subtitle">Language, keyboard, speech</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="profile-item">
                                    <i className="bi bi-clock-history"></i>
                                    <div className="profile-item-content">
                                        <div className="profile-item-title">Activity controls</div>
                                        <div className="profile-item-subtitle">YouTube history, location data</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-footer">
                        <button className="sign-out-btn">
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {(showSupportDrawer || showAlexaDrawer || showSettingsDrawer || showAppsDrawer || showProfileDrawer) && (
                <div className="drawer-overlay" onClick={() => {
                    setShowSupportDrawer(false)
                    setShowAlexaDrawer(false)
                    setShowSettingsDrawer(false)
                    setShowAppsDrawer(false)
                    setShowProfileDrawer(false)
                }}></div>
            )}

            {/* Compose Panel */}
            <div className={`compose-panel ${showComposeModal ? 'show' : ''}`}>
                <div className="compose-panel-content">
                    <div className="compose-panel-header">
                        <h6 className="compose-panel-title">New Message</h6>
                        <div className="compose-panel-controls">
                            <button type="button" className="panel-btn minimize-btn" onClick={handleMinimizePanel}>
                                <i className="bi bi-dash"></i>
                            </button>
                            <button type="button" className="panel-btn close-btn" onClick={() => setShowComposeModal(false)}>
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                    </div>
                    <div className="compose-panel-body">
                        <div className="compose-field">
                            <input 
                                type="email" 
                                className="compose-input" 
                                placeholder="Recipients"
                                value={composeData.recipients}
                                onChange={(e) => handleComposeChange('recipients', e.target.value)}
                            />
                            {composeErrors.recipients && (
                                <div className="compose-error">{composeErrors.recipients}</div>
                            )}
                        </div>
                        <div className="compose-field">
                            <input 
                                type="text" 
                                className="compose-input" 
                                placeholder="Subject"
                                value={composeData.subject}
                                onChange={(e) => handleComposeChange('subject', e.target.value)}
                            />
                            {composeErrors.subject && (
                                <div className="compose-error">{composeErrors.subject}</div>
                            )}
                        </div>
                        <div className="compose-field">
                            <textarea 
                                className="compose-textarea" 
                                placeholder="Compose email" 
                                rows="12"
                                value={composeData.message}
                                onChange={(e) => handleComposeChange('message', e.target.value)}
                            ></textarea>
                            {composeErrors.message && (
                                <div className="compose-error">{composeErrors.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="compose-panel-footer">
                        <button type="button" className="send-btn" onClick={handleSendEmail}>
                            <i className="bi bi-send"></i>
                            Send
                        </button>
                        
                        {/* Subject Confirmation Popup */}
                        {showSubjectConfirm && (
                            <div className="subject-confirm-popup">
                                <div className="confirm-content">
                                    <h6>Continue without subject?</h6>
                                    <p>Your email will be sent without a subject line.</p>
                                    <div className="confirm-buttons">
                                        <button 
                                            type="button" 
                                            className="confirm-btn yes-btn" 
                                            onClick={sendEmail}
                                        >
                                            Send Anyway
                                        </button>
                                        <button 
                                            type="button" 
                                            className="confirm-btn no-btn" 
                                            onClick={() => setShowSubjectConfirm(false)}
                                        >
                                            Add Subject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Custom Alert */}
            {customAlert.show && (
                <div className={`custom-alert ${customAlert.type}`}>
                    <div className="alert-content">
                        <i className={`bi ${customAlert.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'}`}></i>
                        <span>{customAlert.message}</span>
                    </div>
                </div>
            )}
            </main>
        </div>
    )
}

export default Home
