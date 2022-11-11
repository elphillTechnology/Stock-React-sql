import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { UserLogout } from '../../Redux/Action/UserAction';

export default function Topnavbar() {

    const [firstName, setfirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [UserType, setUserType] = useState("")

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            setfirstName(userInfo.user.firstName)
            setLastName(userInfo.user.lastName)
            setUserType(userInfo.user.userType)
        }
    }, [userInfo])



    const logoutHandaler = () => {
        dispatch(UserLogout())
    }

    return (
        <>
            <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
                <div className="container-fluid px-0">
                    <div className="d-flex justify-content-between w-100" id="navbarSupportedContent">
                        <div className="d-flex align-items-center">
                            <button id="sidebar-toggle" className="sidebar-toggle me-3 btn btn-icon-only d-none d-lg-inline-block align-items-center justify-content-center" data-bs-dismiss="sidebarMenu">
                                <svg className="toggle-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item dropdown">
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                                    <div className="list-group list-group-flush">
                                        <Link to={"/"} className="text-center text-primary fw-bold border-bottom border-light py-3">Notifications</Link>
                                        <Link to={"https://demo.themesberg.com/volt-pro/pages/calendar.html"} className="list-group-item list-group-item-action border-bottom"><div className="row align-items-center">
                                            <div className="col-auto">
                                                <img alt="placeholder" src="../../assets/img/team/profile-picture-1.jpg" className="avatar-md rounded" />
                                            </div>
                                            <div className="col ps-0 ms-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="h6 mb-0 text-small">Jose Leos</h4>
                                                    </div>
                                                    <div className="text-end">
                                                        <small className="text-danger">a few moments ago</small>
                                                    </div>
                                                </div>
                                                <p className="font-small mt-1 mb-0">
                                                    Added you to an event "Project stand-up" tomorrow at
                                                    12:30 AM.
                                                </p>
                                            </div>
                                        </div></Link>
                                        <Link to={"https://demo.themesberg.com/volt-pro/pages/tasks.html"} className="list-group-item list-group-item-action border-bottom">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <img alt="placeholder" src="../../assets/img/team/profile-picture-2.jpg" className="avatar-md rounded" />
                                                </div>
                                                <div className="col ps-0 ms-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="h6 mb-0 text-small">Neil Sims</h4>
                                                        </div>
                                                        <div className="text-end">
                                                            <small className="text-danger">2 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="font-small mt-1 mb-0">
                                                        You've been assigned a task for "Awesome new
                                                        project".
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to={"https://demo.themesberg.com/volt-pro/pages/tasks.html"} className="list-group-item list-group-item-action border-bottom"><div className="row align-items-center">
                                            <div className="col-auto">
                                                <img alt="placeholder" src="../../assets/img/team/profile-picture-3.jpg" className="avatar-md rounded" />
                                            </div>
                                            <div className="col ps-0 m-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="h6 mb-0 text-small">Roberta Casas</h4>
                                                    </div>
                                                    <div className="text-end"><small>5 hrs ago</small></div>
                                                </div>
                                                <p className="font-small mt-1 mb-0">
                                                    Tagged you in a document called "Financial plans",
                                                </p>
                                            </div>
                                        </div>
                                        </Link>
                                        <Link to={"https://demo.themesberg.com/volt-pro/pages/single-message.html"} className="list-group-item list-group-item-action border-bottom"><div className="row align-items-center">
                                            <div className="col-auto">
                                                <img alt="placeholder" src="../../assets/img/team/profile-picture-4.jpg" className="avatar-md rounded" />
                                            </div>
                                            <div className="col ps-0 ms-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="h6 mb-0 text-small">Joseph Garth</h4>
                                                    </div>
                                                    <div className="text-end"><small>1 d ago</small></div>
                                                </div>
                                                <p className="font-small mt-1 mb-0">
                                                    New message: "Hey, what's up? All set for the
                                                    presentation?"
                                                </p>
                                            </div>
                                        </div>
                                        </Link>
                                        <Link to={"https://demo.themesberg.com/volt-pro/pages/single-message.html"} className="list-group-item list-group-item-action border-bottom"><div className="row align-items-center">
                                            <div className="col-auto">
                                                <img alt="placeholder" src="../../assets/img/team/profile-picture-5.jpg" className="avatar-md rounded" />
                                            </div>
                                            <div className="col ps-0 ms-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="h6 mb-0 text-small">Bonnie Green</h4>
                                                    </div>
                                                    <div className="text-end"><small>2 hrs ago</small></div>
                                                </div>
                                                <p className="font-small mt-1 mb-0">
                                                    New message: "We need to improve the UI/UX for the
                                                    landing page."
                                                </p>
                                            </div>
                                        </div>
                                        </Link>
                                        <Link to={"/"} className="dropdown-item text-center fw-bold rounded-bottom py-3">
                                            <svg className="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                                            </svg>
                                            View all</Link>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item dropdown ms-lg-3">
                                <Link to={"/"} className="nav-link dropdown-toggle pt-1 px-0" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="media d-flex align-items-center">
                                        <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block flex-column px-2" style={{ "position": "relative", "top": "3px" }}>
                                            <p className="mb-0 font-small fw-bold text-gray-900" style={{ "textTransform": "capitalize" }}>{firstName} {LastName}</p>
                                            <span className="mb-0 font-small fw-bold text-gray-900 user_type">{UserType}</span>
                                        </div>
                                        <p className='avatar rounded-circle'> {firstName[0]}{LastName[0]} </p>
                                    </div>
                                </Link>
                                <div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
                                    <Link className="dropdown-item d-flex align-items-center" to={"/user/profile"}>
                                        <svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                        </svg>
                                        My Profile
                                    </Link>
                                    <div role="separator" className="dropdown-divider my-1"></div>
                                    <button className="dropdown-item d-flex align-items-center" onClick={logoutHandaler}>
                                        <i className='fa fa-sign-out btn-outline-danger'></i> &nbsp; Logout
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );

}

