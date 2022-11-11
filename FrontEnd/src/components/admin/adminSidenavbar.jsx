import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../Images/logo3.png'

export default function AdminSidenavbar() {
    return (
        <>
            <nav id="sidebarMenu" className="sidebar d-lg-block h-5 text-white collapse" data-simplebar style={{ "backgroundColor": "#1b2218" }}>
                <div className="sidebar-inner px-4 pt-3">
                    <div className="user-card d-flex d-md-none justify-content-between justify-content-md-center pb-4">
                        <div className="d-flex align-items-center">
                            <div className="avatar-lg me-4">
                                <img src="../../assets/img/team/profile-picture-3.jpg" className="card-img-top rounded-circle border-white"
                                    alt="Bonnie Green" />
                            </div>
                        </div>
                        <div className="collapse-close d-md-none">
                            <a href="#sidebarMenu" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                                aria-expanded="true" aria-label="Toggle navigation"><svg className="icon icon-xs" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"></path>
                                </svg></a>
                        </div>
                    </div>
                    <ul className="nav flex-column pt-3 pt-md-0">
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link d-flex align-items-center">
                                <span className="sidebar-icon">
                                    <img src={logo} width="30" alt='Logo' /> </span>
                                <span className="mt-1 sidebar-text logo_text"> Jalu Algos </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link d-flex justify-content-between align-items-center">
                                <span>
                                    <span className="sidebar-icon">
                                        <i className="fa fa-dashboard" aria-hidden="true"></i>
                                    </span>
                                    <span className="sidebar-text">Dashboard</span>
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin/user-list"} className="nav-link d-flex align-items-center justify-content-between">
                                <span>
                                    <span className="sidebar-icon">
                                        <i className='fa fa-user' aria-hidden="true"></i>
                                    </span>
                                    <span className="sidebar-text">User List</span>
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin/generate-Password"} className="nav-link d-flex align-items-center justify-content-between">
                                <span>
                                    <span className="sidebar-icon">
                                        <i className="fa fa-key" aria-hidden="true"></i>
                                    </span>
                                    <span className="sidebar-text">Generate Password</span>
                                </span>
                            </Link>
                        </li>
                        <li role="separator" className="dropdown-divider mt-4 mb-3 border-gray-700"></li>
                        <li className="nav-item">
                            <Link to={"/admin/global_setting"} className="nav-link d-flex align-items-center justify-content-between">
                                <span>
                                    <span className="sidebar-icon">
                                        <i className="fa-sharp fa-solid fa-sliders" aria-hidden="true"></i>
                                    </span>
                                    <span className="sidebar-text">Global Settings</span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );

}

