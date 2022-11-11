import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminSidenavbar from './adminSidenavbar'
import AdminTopnavbar from './adminTopnavbar'
import ViewStratagyModal from './adminviewstragymodal'

export default function AdminStategyListing() {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    return (
        <>
            <AdminSidenavbar />
            <main className="content">
                <AdminTopnavbar />
                <div className="row mt-2">
                    <div className="col-md-6">
                        <button type="button" className="btn forms_btn" onClick={() => navigate(-1)}> <i className='fa fa-arrow-left'></i> </button>
                    </div>
                    <div className="col-sm-6 d-flex flex-row-reverse mb-3 gap-2">
                        <button type='button' className='btn forms_btn' data-bs-toggle="modal" data-bs-target="#addApiModal"> Add Strategy </button>
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
                                    <table className="table table-centered table-nowrap mb-0 rounded">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="border-0 rounded-start">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="check-all" />
                                                    </div>
                                                </th>
                                                <th className="border-0">strategy</th>
                                                <th className="border-0">amoiunt</th>
                                                <th className="border-0">profit</th>
                                                <th className="border-0">loss</th>
                                                <th className="border-0">stop loss</th>
                                                <th className="border-0">date</th>
                                                <th className="border-0 rounded-end">time</th>
                                                <th className="border-0 rounded-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border-0">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="restcheckbot" />
                                                    </div>
                                                </td>
                                                <td className="border-0">PD001T30</td>
                                                <td className="border-0 fw-bold">$ 10,000</td>
                                                <td className="border-0 text-success">$ 1,600</td>
                                                <td className="border-0 fw-bold">$ 000</td>
                                                <td className="border-0">23:20</td>
                                                <td className="border-0 fw-bold">06 nov 2022</td>
                                                <td className="border-0 text-success">5:32</td>
                                                <td className="border-0 text-success"><button type="button" className="btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#addApiModal">View</button></td>
                                            </tr>
                                            <tr>
                                                <td className="border-0">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="restcheckbot" />
                                                    </div>
                                                </td>
                                                <td className="border-0">
                                                    PD001T30
                                                </td>
                                                <td className="border-0 fw-bold">$ 10,000</td>
                                                <td className="border-0 text-success">$ 1,600</td>
                                                <td className="border-0 fw-bold">$ 000</td>
                                                <td className="border-0">23:20</td>
                                                <td className="border-0 fw-bold">06 nov 2022</td>
                                                <td className="border-0 text-success">5:32</td>
                                                <td className="border-0 text-success"><button type="button" className="btn btn-primary btn-sm m-1">View</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
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
            <ViewStratagyModal />
        </>
    )
}
