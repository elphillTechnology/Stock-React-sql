import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../Images/logo3.png'


export default function Sidenavbar() {
    return (
        <>
            <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
                <Link className="navbar-brand me-lg-5" href="https://demo.themesberg.com/volt-pro/index.html">
                    <img className="navbar-brand-dark" src="https://demo.themesberg.com/volt-pro/assets/img/brand/light.svg" alt="Volt logo" />
                    <img className="navbar-brand-light" src="https://demo.themesberg.com/volt-pro/assets/img/brand/dark.svg" alt="Volt logo" />
                </Link>
                <div className="d-flex align-items-center">
                    <button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
            <nav id="sidebarMenu" className="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar>
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
                            <Link to={"/user"} className="nav-link d-flex align-items-center">
                                <span className="sidebar-icon">
                                    <img src={logo} width="30" alt='Logo' />
                                </span>
                                <span className="mt-1 sidebar-text logo_text"> Jalu Algos </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link d-flex justify-content-between align-items-center">
                                <span>
                                    <span className="sidebar-icon">
                                        <i className="fa fa-dashboard" aria-hidden="true"></i>
                                    </span>
                                    <span className="sidebar-text">Dashboard</span>
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/user/all-api"} className="nav-link d-flex align-items-center justify-content-between">
                                <span>
                                    <span className="sidebar-icon">
                                        <svg
                                            className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                                            </path>
                                        </svg>
                                    </span>
                                    <span className="sidebar-text">All API</span>
                                </span>
                            </Link>
                        </li>
                        <li role="separator" className="dropdown-divider mt-4 mb-3 border-gray-700"></li>
                    </ul>
                </div>
            </nav>
        </>
    );

}

