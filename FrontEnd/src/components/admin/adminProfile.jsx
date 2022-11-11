import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/profile.css'
import { useSelector } from 'react-redux'
import AdminSidenavbar from './adminSidenavbar'
import AdminTopnavbar from './adminTopnavbar'

export default function AdminProfile() {

    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const [Name, setName] = useState("")
    const [PanCard, setPanCard] = useState("")

    const [Dob, setDob] = useState("")
    const [PhoneNo, setPhoneNo] = useState("")
    const [Email, setEmail] = useState("")
    const [UniqueId, setUniqueId] = useState("")

    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else {
            if (userInfo.user) {
                if (userInfo.user.userType === "admin") {
                    setName(userInfo.user.firstName + " " + userInfo.user.lastName)
                    setEmail(userInfo.user.email)
                    setPanCard(userInfo.user.panNumber)
                    setUniqueId(userInfo.user.id)
                    setDob(userInfo.user.dob)
                    setPhoneNo(userInfo.user.phone)
                } else {
                    navigate("/")
                }
            }
        }
    }, [navigate, userInfo])

    return (
        <>
            <AdminSidenavbar />
            <main className="content" style={{ "minHeight": "300px" }}>
                <AdminTopnavbar />
                <section className="user_profl_sec">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="user_dp">
                                <p className='avatar rounded-circle' style={{ "width": "100%", "height": "100%", "fontSize": "38px" }}> {userInfo.user.firstName[0]}{userInfo.user.lastName[0]} </p>
                            </div>
                            <b className="user_name">{Name}</b>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="user_details_tab">
                                <div className="tab_inner">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Change Password</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">profile details</button>
                                        </li>

                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="user_tab_details">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <p className="change_para">To protect the security of your account, please confirm your password below.</p>
                                                    </div>

                                                    <form className="needs-validation" noValidate>
                                                        <div className="row justify-content-center">
                                                            <div className="col-md-6 position-relative">
                                                                <label htmlFor="validationTooltip02" className="form-label">New Password</label>
                                                                <div className="login_input mb-4" id="password_input">
                                                                    <input type="text" className="form-control" id="validationTooltip02" value={Password} required="" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
                                                                    <div className="valid-tooltip">
                                                                        Looks good!
                                                                    </div>
                                                                    <div className="invalid-tooltip">
                                                                        Please choose a unique and valid username.
                                                                    </div>
                                                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row justify-content-center">
                                                            <div className="col-md-6 position-relative">
                                                                <label htmlFor="validationTooltip02" className="form-label">Confirm Password</label>
                                                                <div className="login_input mb-4 in-valid" id="confirm_password_input">
                                                                    <input type="text" className="form-control" id="validationTooltip02" value={ConfirmPassword} required="" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                                                    <div className="valid-tooltip">
                                                                        Looks good!
                                                                    </div>
                                                                    <div className="invalid-tooltip">
                                                                        Please choose a unique and valid username.
                                                                    </div>
                                                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row justify-content-center">
                                                            <div className="col-sm-6">
                                                                <button className="btn btn-primary subnit_btn mb-4" type="submit">Update Password</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="user_tab_details">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <p className="change_para">To protect the security of your account, please confirm your password below.</p>
                                                    </div>

                                                    <form className="needs-validation" noValidate>
                                                        <div className="row">
                                                            <div className="col-md-6 position-relative">
                                                                <label htmlFor="validationTooltip01" className="form-label">Name</label>

                                                                <div className="login_input mb-4 in-valid" id="email_input">
                                                                    <input type="text" className="form-control" id="validationTooltip01" value={Name} required="" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                                                    <div className="valid-tooltip">
                                                                        Looks good!
                                                                    </div>
                                                                    <div className="invalid-tooltip">
                                                                        Please choose a unique and valid username.
                                                                    </div>
                                                                    <div className="input_icon"><i className="fa-solid fa-envelope"></i></div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 position-relative">
                                                                <label htmlFor="validationTooltip02" className="form-label">Pan Card Id</label>
                                                                <div className="login_input mb-4" id="password_input">
                                                                    <input type="text" className="form-control" id="validationTooltip02" value={PanCard} required="" placeholder="Pan Card Id" onChange={(e) => setPanCard(e.target.value)} />
                                                                    <div className="valid-tooltip">
                                                                        Looks good!
                                                                    </div>
                                                                    <div className="invalid-tooltip">
                                                                        Please choose a unique and valid username.
                                                                    </div>
                                                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 position-relative">
                                                                <label htmlFor="validationTooltip02" className="form-label">Date Of Birth</label>
                                                                <div className="login_input mb-4 in-valid" id="confirm_password_input">
                                                                    <input type="text" className="form-control" id="validationTooltip02" required placeholder="Dath of Birth" value={Dob} onChange={(e) => setDob(e.target.value)} />
                                                                    <div className="valid-tooltip">
                                                                        Looks good!
                                                                    </div>
                                                                    <div className="invalid-tooltip">
                                                                        Please choose a unique and valid username.
                                                                    </div>
                                                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 position-relative">
                                                                <label htmlFor="validationTooltip02" className="form-label">Phone No</label>
                                                                <div className="login_input mb-4 in-valid" id="confirm_password_input">
                                                                    <input type="text" className="form-control" id="validationTooltip02" value={PhoneNo} required="" placeholder="Gender" onChange={(e) => setPhoneNo(e.target.value)} />
                                                                    <div className="valid-tooltip">
                                                                        Looks good!
                                                                    </div>
                                                                    <div className="invalid-tooltip">
                                                                        Please choose a unique and valid username.
                                                                    </div>
                                                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 position-relative">
                                                                <label htmlFor="validationTooltip02" className="form-label">Email</label>
                                                                <div className="login_input mb-4 in-valid" id="confirm_password_input">
                                                                    <input type="text" className="form-control" id="validationTooltip02" value={Email} required="" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                                                    <div className="valid-tooltip">
                                                                        Looks good!
                                                                    </div>
                                                                    <div className="invalid-tooltip">
                                                                        Please choose a unique and valid username.
                                                                    </div>
                                                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 position-relative">
                                                                <label htmlFor="validationTooltip02" className="form-label">Unique Code</label>
                                                                <div className="login_input mb-4 in-valid" id="confirm_password_input">
                                                                    <input type="text" className="form-control" id="validationTooltip02" value={UniqueId} required="" placeholder="Unique Code" onChange={(e) => setUniqueId(e.target.value)} />
                                                                    <div className="valid-tooltip">
                                                                        Looks good!
                                                                    </div>
                                                                    <div className="invalid-tooltip">
                                                                        Please choose a unique and valid username.
                                                                    </div>
                                                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row justify-content-center">
                                                            <div className="col-sm-6">
                                                                <button className="btn btn-primary subnit_btn mb-4" type="submit">Update Details</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
        </>
    )
}
