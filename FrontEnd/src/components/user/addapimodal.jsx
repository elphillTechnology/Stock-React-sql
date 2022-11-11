import React from 'react';
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import { CreateUserApiAction } from '../../Redux/Action/ApiAction';

export default function Model(props) {

    const { register, handleSubmit, reset } = useForm();

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        dispatch(CreateUserApiAction(data))
        // reset()
    };

    return (
        <>
            <div className="modal fade show" id="formModal" tabIndex="-1" aria-labelledby="exampleModalXlLabel" aria-modal="true" role="dialog" style={{ display: "none" }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title h4" id="exampleModalXlLabel">Add Api Model</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="apikey" className="form-label">API key</label>
                                        <input type="text" className="form-control" id="apikey" {...register("api_key", { required: true })} />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apisecret" className="form-label">API Secret</label>
                                        <input type="text" className="form-control" id="apisecret" {...register("api_secrect_key", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apiid" className="form-label">API ID</label>
                                        <input type="text" className="form-control" id="apiid"  {...register("api_id", { required: true })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

