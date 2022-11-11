import React from 'react';
import { Link } from 'react-router-dom';
import Sidenavbar from "./sidenavbar";
import Topnavbar from "./topnavbar";
import UserStrategyPassword from './UserStrategyPasswordModal';
// import { Createstratagymodal } from "./createstratagymodal";


export default function Viewstrategy(props) {

    return (
        <>
            <Sidenavbar />
            <main className="content">
                <Topnavbar />
                {/* <div className="py-4">
                    <div className="dropdown">
                        <button className="btn btn-gray-800 d-inline-flex align-items-center me-2 dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg className="icon icon-xs me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add New Strategy
                        </button>
                    </div>
                </div> */}
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
                                                <td className="border-0 text-success"><button type="button" className="btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button></td>
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
                                            <li className="disabled page-item" title="previous page"><Link to={"#"} className="page-link">Previous</Link></li>
                                            <li className="active page-item" title="1"><Link to={"#"} className="page-link">1</Link></li>
                                            <li className="page-item" title="2"><Link to={"#"} className="page-link">2</Link></li>
                                            <li className="page-item" title="3"><Link to={"#"} className="page-link">3</Link></li>
                                            <li className="page-item" title="next page"><Link to={"#"} className="page-link">Next</Link></li>
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
            <UserStrategyPassword />
            {/* <Createstratagymodal/> */}
        </>
    );

}

