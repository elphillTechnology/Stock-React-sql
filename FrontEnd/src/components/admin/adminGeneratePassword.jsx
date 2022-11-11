import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import AdminSidenavbar from "./adminSidenavbar";
import AdminTopnavbar from "./adminTopnavbar";
import AdminNewPasswordModal from './adminNewPasswordModal';
import { CreateApiKeyAction, GetAllApisAction } from '../../Redux/Action/ApiAction';
import '../../css/ModalStyle.css'
import ErrorAlert from '../Shared/Alert';
import MagnifineLoader from '../Shared/loader';

export default function AdminGeneratePassword() {

    const [Oldpassword, setOldPassword] = useState("")
    const [ApiId, setApiId] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const GetAllApi = useSelector((state) => state.GetAllApi)
    const { userInfo } = userLogin
    const { loading, ApiLists, error } = GetAllApi


    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
        dispatch(GetAllApisAction())
    }, [navigate, userInfo, dispatch])


    const HandelSubmit = (e) => {
        e.preventDefault()
        dispatch(CreateApiKeyAction(ApiId, Oldpassword))
    }
    
    const generatePassword = () => {
        const randomPassword = Math.random().toString(30).slice(2) + Math.random().toString(30).slice(2);
        setOldPassword(randomPassword);
    };

    const SetPasswordForModal = (Password, Id) => {
        setOldPassword(Password)
        setApiId(Id)
    }

    return (
        <>
            <AdminSidenavbar />
            <main className="content" style={{ "minHeight": "300px" }}>
                <AdminTopnavbar />
                <div className="row mt-2">
                    <div className="col-sm-12 col-sm-12 d-flex flex-row-reverse mb-3 gap-2">
                        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#newModal">
                            Add Password
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 shadow">
                            <div className="card-body listing_table">
                                <div className="dataTable-top">
                                    <div className="dataTable-dropdown">
                                        <label className="data-table-left">
                                            <div className="col-auto">
                                                <select className="pe-5 form-select">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="30">30</option>
                                                    <option value="50">50</option>
                                                </select>
                                            </div>
                                            <div className="d-flex align-items-center ps-0 col-auto entries_label">entries per page</div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Default checkbox
                                                </label>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="dataTable-search">
                                        <label htmlFor="search-bar-0" className="search-label">
                                            <input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control " placeholder="Search in this table..." value="" />
                                        </label>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    {
                                        loading ? <MagnifineLoader /> : error ? <ErrorAlert variant="danger" children={error} /> : (ApiLists.length === 0) ? <ErrorAlert variant="success" children={"No Api Found"} /> :
                                            (
                                                <table className="table table-centered table-nowrap mb-0 rounded">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th className="border-0 rounded-start">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="check-all" />
                                                                </div>
                                                            </th>
                                                            <th className="border-0">API Key</th>
                                                            <th className="border-0">API Secrect key</th>
                                                            <th className="border-0">API ID</th>
                                                            <th className="border-0">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(ApiLists.map((ApiLists, index) => (
                                                            <tr key={index}>
                                                                <td className="border-0">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="restcheckbot" />
                                                                    </div>
                                                                </td>
                                                                <td className="border-0">{ApiLists.apiKey}</td>
                                                                <td className="border-0">{ApiLists.apiSecret}</td>
                                                                <td className="border-0">{ApiLists.clientApiId}</td>
                                                                <td className="border-0">
                                                                    <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" value={ApiLists.password + " " + ApiLists.apiId} onClick={() => SetPasswordForModal(ApiLists.password, ApiLists.apiId)}>
                                                                        <i className='fa fa-key' aria-hidden="true"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )))}
                                                    </tbody>
                                                </table>
                                            )
                                    }
                                </div>
                                <div className="dataTable-bottom">
                                    <div className="dataTable-pagination">
                                        <ul className="pagination react-bootstrap-table-page-btns-ul">
                                            <li className="disabled page-item" title="previous page"><Link to={"/"} className="page-link">Previous</Link></li>
                                            <li className="active page-item" title="1"><Link to={"/"} className="page-link">1</Link></li>
                                            <li className="page-item" title="2"><Link to={"/"} className="page-link">2</Link></li>
                                            <li className="page-item" title="3"><Link to={"/"} className="page-link">3</Link></li>
                                            <li className="page-item" title="next page"><Link to={"/"} className="page-link">Next</Link></li>
                                        </ul>
                                    </div>
                                    <div className="dataTable-info">
                                        <div>Showing <b>10</b> out  of <b>27</b> entries</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Admin Password Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Generate Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="password_area">
                                <input type="text" placeholder="Password" className="form-control" id="input_password" value={Oldpassword} disabled />
                            </div>
                            <div className='d-flex' style={{ "justifyContent": "space-between" }}>
                                <button className="btn submit_password" onClick={generatePassword} style={{ "width": "48%" }}>Generate Password</button>
                                <button className="btn submit_password" type='submit' onClick={HandelSubmit} style={{ "width": "48%" }}>submit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <AdminNewPasswordModal />
        </>
    );

}


