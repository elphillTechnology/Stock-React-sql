import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { UserRegsiterAction } from '../../Redux/Action/UserAction';
import ErrorAlert from '../Shared/Alert';

export default function AdminAddUserModal(props) {

    const [Message, setMessage] = useState("")
    const [Broker, setBroker] = useState("")
    const [BrokerId, setBrokerId] = useState("")

    const AllUser = useSelector((state) => state.AllUser)
    const { UserList, error } = AllUser


    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        if (data.password === data.confirm_password) {
            dispatch(UserRegsiterAction(data, Broker, BrokerId))
            setMessage("New User Add Successful")
            reset()
        } else {
            setMessage("Pleace Check Your Password")
        }
    };

    const SetBrokerSection = (value) => {
        setBroker(value.split(" ")[1] + value.split(" ")[2])
        setBrokerId(value.split(" ")[0])
    }

    return (
        <>
            <div className="modal fade show" id="formModal" tabIndex="-1" aria-labelledby="exampleModalXlLabel" aria-modal="true" role="dialog" style={{ display: "none" }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title h4" id="exampleModalXlLabel">Add User</h5>
                            <p className='error' id='error' style={{ "position": "absolute", "left": "50%", "transform": "translateX(-50%)", "color": "green" }}>{Message}</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onChange={(e) => setMessage("")}></button>
                        </div>
                        <div className="modal-body">
                            {error && <ErrorAlert variant="danger" children={error} />}
                            <div className="row">
                                <form action="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="firstname" className="form-label">Your First Name</label>
                                                <div className="input_area">
                                                    <input type="text" className="form-control" id="firstname" {...register("firstname", { required: true })} aria-describedby="emailHelp" placeholder="First Name" />
                                                    <div className="input_icon"><i className="fa-solid fa-signature"></i></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="lastname" className="form-label">Your Last Name</label>
                                                <div className="input_area">
                                                    <input type="text" className="form-control" id="lastname" {...register("lastname", { required: true })} aria-describedby="emailHelp" placeholder="Last Name" />
                                                    <div className="input_icon"><i className="fa-solid fa-signature"></i></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="dob" className="form-label">DOB</label>
                                                <div className="input_area">
                                                    <input type="date" className="form-control" id="dob" {...register("dob", { required: true })} aria-describedby="emailHelp" placeholder="DOB" />
                                                    <div className="input_icon"><i className="fa-solid fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="pan_number" className="form-label">PAN Number</label>
                                                <div className="input_area">
                                                    <input type="text" className="form-control" id="pan_number" {...register("pan_number", { required: true })} aria-describedby="emailHelp" placeholder="PAN Number" />
                                                    <div className="input_icon"><i className="fa-solid fa-id-card"></i></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="broker" className="form-label">Broker</label>
                                                <div className="input_area">
                                                    <select className="form-select" id="broker" aria-label="Default select example" onChange={(e) => SetBrokerSection(e.target.value)} style={{ "paddingLeft": "49px" }}>
                                                        <option>Select Broker</option>
                                                        {
                                                            UserList.map((UserList) => (
                                                                <option key={UserList.userId} value={UserList.userId + " " + UserList.firstName + " " + UserList.lastName}>{UserList.firstName} {UserList.lastName}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div className="input_icon"><i className="fa-solid fa-handshake-simple-slash"></i></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="client_id" className="form-label">Client ID</label>
                                                <div className="input_area">
                                                    <input type="text" className="form-control" id="client_id" value={BrokerId} aria-describedby="emailHelp" placeholder="Client ID" disabled />
                                                    <div className="input_icon"><i className="fa-solid fa-person"></i></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="email_id" className="form-label">Email ID</label>
                                                <div className="input_area">
                                                    <input type="text" className="form-control" id="email_id" {...register("email_id", { required: true })} aria-describedby="emailHelp" placeholder="Email ID" />
                                                    <div className="input_icon"><i className="fa-solid fa-at"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="phone_no" className="form-label">Phone Number</label>
                                                <div className="input_area">
                                                    <input type="text" className="form-control" id="phone_no" {...register("phone_no", { required: true })} aria-describedby="emailHelp" placeholder="Phone Number" />
                                                    <div className="input_icon"><i className="fa-solid fa-phone"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <div className="input_area">
                                                    <input type="text" className="form-control" id="password" {...register("password", { required: true })} aria-describedby="emailHelp" placeholder="Your Password" />
                                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                                <div className="input_area">
                                                    <input type="text" className="form-control" id="confirm_password" {...register("confirm_password", { required: true })} aria-describedby="emailHelp" placeholder="Your Password" />
                                                    <div className="input_icon"><i className="fa-solid fa-lock"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <button className="btn sign_in_btn">Sign up</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

