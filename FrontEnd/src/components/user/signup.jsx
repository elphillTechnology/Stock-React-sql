import React from 'react';

export default function signup() {

    return (
        <>
        <div className="login_area">
            <div className="login_wrapper">
                <span className="page_title">Sign-Up Page</span>
                <div className="login_inner">
                    <b className="section_title">Create an account</b>

                    <form action="">
                        <div className="form-group mb-4">
                            <label htmlFor="signupemail" className="form-label">your email</label>
                            <div className="input_area">
                                <input type="email" className="form-control" id="signupemail" aria-describedby="emailHelp" placeholder="example@company.com" />
                                <div className="input_icon"><i className="fa-solid fa-envelope"></i></div>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="signuppassword" className="form-label">your password</label>
                            <div className="input_area">
                                <input type="password" className="form-control" id="signuppassword" aria-describedby="emailHelp" placeholder="Password" />
                                <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="signupconfirmpassword" className="form-label">Confirm Password</label>
                            <div className="input_area">
                                <input type="password" className="form-control" id="signupconfirmpassword" aria-describedby="emailHelp" placeholder="Confirm Password" />
                                <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <div className="checkbox_area">
                                <div className="check_item">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">I agree to the <a href="#">terms and conditions</a></label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <button className="btn sign_in_btn">Sign up</button>
                        </div>
                    </form>

                    <span className="register_area">Already have an account? <a href="" className="alt_log_in">Login here</a></span>

                </div>
            </div>
        </div>
        </>
    );

}

