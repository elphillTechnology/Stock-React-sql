import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { AddApiAction } from '../../Redux/Action/ApiAction';

export default function AdminAddApiModal(props) {
    // For a new Api
    const [ApiKey, setApiKey] = useState("")
    const [ApiSecret, setApiSecret] = useState("")
    const [ApiId, setApiId] = useState("")

    // Get User Id From Perams
    let { userId } = useParams()

    const GetApi = useSelector((state) => state.GetApi)
    const SingleApiKey = useSelector((state) => state.SingleApiKey)

    const { ApiList } = GetApi
    const { singleApiKey } = SingleApiKey

    // Copy for a new Api
    const [NewApiKey, setNewApiKey] = useState("")
    const [NewApiSecret, setNewApiSecret] = useState("")
    const [NewApiId, setNewApiId] = useState("")

    // For message 
    const [Error, setError] = useState("")
    const [Success, setSuccess] = useState("")

    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch()

    useEffect(() => {
        if (singleApiKey) {
            ApiList.map((ApiList) => {
                if (ApiList.apiId === singleApiKey) {
                    setApiKey(ApiList.apiKey)
                    setApiSecret(ApiList.apiSecret)
                    setApiId(ApiList.clientApiId)
                    setNewApiKey(ApiList.apiKey)
                    setNewApiSecret(ApiList.apiSecret)
                    setNewApiId(ApiList.clientApiId)
                }
            })
        }
    }, [ApiList, singleApiKey])

    // For create a new api
    const onSubmit = (data) => {
        dispatch(AddApiAction(data, userId))
        setSuccess("New Api added")
        reset()
    };

    // For Create a copy api
    const CopyForm = (e) => {
        e.preventDefault()
        if ((NewApiId !== ApiId) && (NewApiKey !== ApiKey) && (NewApiSecret !== ApiSecret)) {
            let data = { api_key: `${NewApiKey}`, api_secrect_key: `${NewApiSecret}`, api_id: `${NewApiId}` }
            document.getElementById('error').style.color = "green"
            setError("Copy Api Added Success")
        } else {
            document.getElementById('error').style.color = "red"
            setError("This Api Already Exist")
        }
    }

    // For Set message after submit forms
    const setAllMessages = () => {
        setError("")
        setSuccess("")
    }

    return (
        <div className="modal fade show" id="formModal" tabIndex="-1" aria-labelledby="exampleModalXlLabel" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title h4" id="exampleModalXlLabel">Add API for User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={setAllMessages}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <form onSubmit={handleSubmit(onSubmit)} id="new_api">
                                <p className='error' style={{ "position": "absolute", "left": "50%", "transform": "translateX(-50%)", "color": "green" }}>{Success}</p>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="apikey" className="form-label">API key</label>
                                    <input type="text" className="form-control" id="apikey" {...register("api_key", { required: true })} onClick={(e) => setSuccess("")} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apisecret" className="form-label">API Secret</label>
                                    <input type="text" className="form-control" id="apisecret" {...register("api_secrect_key", { required: true })} onClick={(e) => setSuccess("")} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apiid" className="form-label">API ID</label>
                                    <input type="text" className="form-control" id="apiid"  {...register("api_id", { required: true })} onClick={(e) => setSuccess("")} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            <form onSubmit={CopyForm} id="exsisting_user">
                                <p className='error' id='error' style={{ "position": "absolute", "left": "50%", "transform": "translateX(-50%)" }}>{Error}</p>
                                <div className="mt-3 mb-3">
                                    <label htmlFor="apikey" className="form-label">API key</label>
                                    <input type="text" className="form-control" id="existing_apikey" value={NewApiKey} onChange={(e) => setNewApiKey(e.target.value)} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apisecret" className="form-label">API Secret</label>
                                    <input type="text" className="form-control" id="existing_apisecret" value={NewApiSecret} onChange={(e) => setNewApiSecret(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apiid" className="form-label">API ID</label>
                                    <input type="text" className="form-control" id="existing_apiid" value={NewApiId} onChange={(e) => setNewApiId(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

