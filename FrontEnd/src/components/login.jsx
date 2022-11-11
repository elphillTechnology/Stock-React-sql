import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserLoginAction } from '../Redux/Action/UserAction'


export default function Login() {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            if (userInfo.user.userType === 'admin') {
                navigate('/admin')
            } else {
                navigate('/user')
            }
        }
    }, [navigate, userInfo])


    const onSubmit = (data) => {
        dispatch(UserLoginAction(data))
    }

    return (
        <>
            <div className="login_area">
                <div className="login_wrapper">

                    <span className="page_title">login page</span>
                    <div className="login_inner">
                        <b className="section_title">Sign in to our platform</b>
                        <p>{errors.age?.message}</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                            <div className="form-group mb-4">
                                <label htmlFor="loginemail" className="form-label">your email</label>
                                <div className="input_area">
                                    {/* <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@company.com" /> */}
                                    <input type="email" className="form-control" id="loginemail" {...register("loginemail", { required: true })} aria-describedby="emailHelp" placeholder="example@company.com" />
                                    <div className="input_icon">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                </div>
                                {errors.loginemail?.type === 'required' && <p role="alert">First name is required</p>}
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="loginpassword" className="form-label">your password</label>
                                <div className="input_area">
                                    {/* <input type="email" className="form-control" id="loginpassword" aria-describedby="emailHelp" placeholder="Password" /> */}
                                    <input type="password" className="form-control" id="loginpassword" {...register("loginpassword")} placeholder="Password" />
                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <div className="checkbox_area">
                                    <div className="check_item">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                                    </div>
                                    <Link to={"/"} className="lost_password">lost password?</Link>
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <button className="btn sign_in_btn">Sign in</button>
                            </div>
                        </form>

                        <span className="register_area">Not registered? <Link to={"/signup"} className="create_account">Create account</Link></span>

                    </div>
                </div>
            </div>
        </>
    );

}

