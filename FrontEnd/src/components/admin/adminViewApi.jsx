import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidenavbar from "./adminSidenavbar";
import AdminTopnavbar from "./adminTopnavbar";
import AdminAddApiModal from "./adminAddApiModal";
import { useSelector, useDispatch } from 'react-redux'
import { ApiKeyAction, GetApiAction } from '../../Redux/Action/ApiAction';
import MagnifineLoader from '../Shared/loader';
import ErrorAlert from '../Shared/Alert';


export default function AdminViewApi(props) {

    const userLogin = useSelector((state) => state.userLogin)
    const GetApi = useSelector((state) => state.GetApi)
    const { userInfo } = userLogin
    const { loading, ApiList, error } = GetApi

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let { userId } = useParams()

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
        dispatch(GetApiAction(userId))
    }, [dispatch, navigate, userId, userInfo])

    console.log(ApiList);


    const OpenModal = (data) => {
        dispatch(ApiKeyAction(data))
        document.getElementById("new_api").style.display = "none";
        document.getElementById("exsisting_user").style.display = "block";
    }

    const NewApi = () => {
        document.getElementById("new_api").style.display = "block";
        document.getElementById("exsisting_user").style.display = "none";
    }



    return (
        <>
            <AdminSidenavbar />
            <main className="content">
                <AdminTopnavbar />
                <div className="row">
                    <div className='col-sm-6 mb-3'>
                        <button type="button" className="btn forms_btn" onClick={() => navigate(-1)}> <i className='fa fa-arrow-left'></i> </button>
                    </div>

                    <div className="col-sm-6 d-flex flex-row-reverse mb-3">
                        <button type="button" className="btn forms_btn" data-bs-toggle="modal" data-bs-target="#formModal" data-bs-whatever="@mdo" onClick={NewApi}>
                            Add API
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
                                        loading ? <MagnifineLoader /> : error ? <ErrorAlert variant="danger" children={error} /> : (
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
                                                    {ApiList.map((ApiList, index) => (
                                                        <tr key={index}>
                                                            <td className="border-0">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="restcheckbot" />
                                                                </div>
                                                            </td>
                                                            <td className="border-0">{ApiList.apiKey}</td>
                                                            <td className="border-0">{ApiList.apiSecret}</td>
                                                            <td className="border-0">{ApiList.clientApiId}</td>
                                                            <td className="border-0 p-1">
                                                                <Link to={`/admin/strategy/${ApiList.apiId}`} className="btn btn-primary btn-sm m-1">View</Link>
                                                                <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#formModal" data-bs-whatever="@mdo" value={ApiList.apiId} onClick={() => OpenModal(ApiList.apiId)}>Copy</button>
                                                            </td>
                                                        </tr>
                                                    ))}
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
            <AdminAddApiModal />
        </>
    );
}

