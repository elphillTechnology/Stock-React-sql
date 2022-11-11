import React, { useState } from 'react'
import '../../css/ModalStyle.css'
import { useSelector, useDispatch } from 'react-redux'
import MagnifineLoader from '../Shared/loader'
import ErrorAlert from '../Shared/Alert'
import { CreateApiKeyAction } from '../../Redux/Action/ApiAction'

function AdminNewPasswordModal() {

    const [password, setPassword] = useState("")
    const [api, setApi] = useState("")

    const GetAllApi = useSelector((state) => state.GetAllApi)
    const { loading, ApiLists, error } = GetAllApi

    const dispatch = useDispatch()

    const HandelSubmit = (e) => {
        e.preventDefault()
        dispatch(CreateApiKeyAction(api, password))
    }


    const generatePassword = () => {
        const randomPassword = Math.random().toString(30).slice(2) + Math.random().toString(30).slice(2);
        setPassword(randomPassword);
    };

    return (
        <div className="modal fade" id="newModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Generate Password</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            <div className='col-md-12 mb-1'>
                                <select className="form-select" aria-label="Default select example" name="api_drop_down" id="api_drop_down" value={api} onChange={(e) => setApi(e.target.value)}>
                                    <option> Select Api </option>
                                    {error ? <ErrorAlert variant="danger" children={error} /> : (
                                        ApiLists.map((ApiLists) => (
                                            <option value={ApiLists.apiId} key={ApiLists.apiId}> {ApiLists.apiKey} </option>
                                        ))
                                    )}
                                </select>
                            </div>
                            <div className="password_area mb-1">
                                <input type="text" placeholder="Password" className="form-control" id="input_password" value={password} disabled />
                            </div>
                            <div className='d-flex' style={{ "justifyContent": "space-between" }}>
                                <button className="btn submit_password" onClick={generatePassword} style={{ "width": "48%" }}>Generate Password</button>
                                <button className="btn submit_password" type='submit' onClick={HandelSubmit} style={{ "width": "48%" }}>submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNewPasswordModal