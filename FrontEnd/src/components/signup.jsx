import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Signup() {

    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        // dispatch(addprofile(data))
    }
    return (
        <>
            <div className="login_area">
                <div className="login_wrapper">
                    <span className="page_title">Sign-Up Page</span>
                    <div className="login_inner">
                        <b className="section_title">Create an account</b>

                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="firstname" className="form-label">Your First Name</label>
                                        <div className="input_area">
                                            <input type="text" className="form-control" id="firstname" {...register("firstname", { required: true })} aria-describedby="emailHelp" placeholder="First Name" />
                                            <div className="input_icon"><i className="fa-solid fa-signature"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="lastname" className="form-label">Your Last Name</label>
                                        <div className="input_area">
                                            <input type="text" className="form-control" id="lastname" {...register("lastname", { required: true })} aria-describedby="emailHelp" placeholder="Last Name" />
                                            <div className="input_icon"><i className="fa-solid fa-signature"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="dob" className="form-label">DOB</label>
                                        <div className="input_area">
                                            <input type="date" className="form-control" id="dob" {...register("dob", { required: true })} aria-describedby="emailHelp" placeholder="DOB" />
                                            <div className="input_icon"><i className="fa-solid fa-calendar"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="pan_number" className="form-label">PAN Number</label>
                                        <div className="input_area">
                                            <input type="text" className="form-control" id="pan_number" {...register("pan_number", { required: true })} aria-describedby="emailHelp" placeholder="PAN Number" />
                                            <div className="input_icon"><i className="fa-solid fa-id-card"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="broker" className="form-label">Broker</label>
                                        <div className="input_area">
                                            <input type="text" className="form-control" id="broker" {...register("broker", { required: true })} aria-describedby="emailHelp" placeholder="Broker" />
                                            <div className="input_icon"><i className="fa-solid fa-handshake-simple-slash"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="client_id" className="form-label">Client ID</label>
                                        <div className="input_area">
                                            <input type="text" className="form-control" id="client_id" {...register("client_id", { required: true })} aria-describedby="emailHelp" placeholder="Client ID" />
                                            <div className="input_icon"><i className="fa-solid fa-person"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="email_id" className="form-label">Email ID</label>
                                        <div className="input_area">
                                            <input type="text" className="form-control" id="email_id" {...register("email_id", { required: true })} aria-describedby="emailHelp" placeholder="Email ID" />
                                            <div className="input_icon"><i className="fa-solid fa-at"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="phone_no" className="form-label">Phone Number</label>
                                        <div className="input_area">
                                            <input type="text" className="form-control" id="phone_no" {...register("phone_no", { required: true })} aria-describedby="emailHelp" placeholder="Phone Number" />
                                            <div className="input_icon"><i className="fa-solid fa-phone"></i></div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className="input_area">
                                            <input type="text" className="form-control" id="password" {...register("password", { required: true })} aria-describedby="emailHelp" placeholder="Your Password" />
                                            <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group mb-4">
                                        <div className="checkbox_area">
                                            <div className="check_item">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" htmlFor="exampleCheck1">I agree to the
                                                    <Link to={"/"}>terms and conditions</Link>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <button className="btn sign_in_btn">Sign up</button>
                                </div>
                            </div>
                        </form>
                        <span className="register_area">Already have an account? <Link to={"/"} className="alt_log_in">Login here</Link></span>
                    </div>
                </div>
            </div>
        </>
    );

}