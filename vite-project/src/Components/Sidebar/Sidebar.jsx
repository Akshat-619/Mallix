import React from 'react';
import './Sidebar.scss';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-content">
                {/* Compose Button */}
                <button className="compose-btn">
                    <i className="bi bi-pencil-square"></i>
                    <span>Compose</span>
                </button>

                {/* Navigation Menu */}
                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        <li className="nav-item active">
                            <a href="#" className="nav-link">
                                <i className="bi bi-inbox"></i>
                                <span className="nav-text">Inbox</span>
                                <span className="nav-count">24</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-star"></i>
                                <span className="nav-text">Starred</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-clock"></i>
                                <span className="nav-text">Snoozed</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-send"></i>
                                <span className="nav-text">Sent</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-file-text"></i>
                                <span className="nav-text">Drafts</span>
                                <span className="nav-count">3</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-tag"></i>
                                <span className="nav-text">All Labels</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Categories Section */}
                <div className="sidebar-section">
                    <h6 className="section-title">Categories</h6>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-chat-dots"></i>
                                <span className="nav-text">Social</span>
                                <span className="nav-count">12</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-tag-fill"></i>
                                <span className="nav-text">Promotions</span>
                                <span className="nav-count">45</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-bell"></i>
                                <span className="nav-text">Updates</span>
                                <span className="nav-count">8</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-shield-exclamation"></i>
                                <span className="nav-text">Spam</span>
                                <span className="nav-count">2</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bi bi-trash"></i>
                                <span className="nav-text">Trash</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Labels Section */}
                <div className="sidebar-section">
                    <div className="section-header">
                        <h6 className="section-title">Labels</h6>
                        <button className="add-label-btn">
                            <i className="bi bi-plus"></i>
                        </button>
                    </div>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <span className="label-dot" style={{backgroundColor: '#4285f4'}}></span>
                                <span className="nav-text">Work</span>
                                <span className="nav-count">18</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <span className="label-dot" style={{backgroundColor: '#ea4335'}}></span>
                                <span className="nav-text">Personal</span>
                                <span className="nav-count">7</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <span className="label-dot" style={{backgroundColor: '#fbbc04'}}></span>
                                <span className="nav-text">Important</span>
                                <span className="nav-count">5</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Storage Info */}
                <div className="storage-info">
                    <div className="storage-bar">
                        <div className="storage-used" style={{width: '65%'}}></div>
                    </div>
                    <div className="storage-text">
                        <span>9.7 GB of 15 GB used</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
