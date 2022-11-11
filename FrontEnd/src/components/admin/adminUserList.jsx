import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import AdminSidenavbar from "./adminSidenavbar";
import AdminTopnavbar from "./adminTopnavbar";
import AdminAddUserModal from './adminAddUserModal';
import { AllUserAction } from '../../Redux/Action/UserAction';
import ErrorAlert from '../Shared/Alert';
import MagnifineLoader from '../Shared/loader';

export default function AdminUserList() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const AllUser = useSelector((state) => state.AllUser)
    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin
    const { loading, UserList, error } = AllUser

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
        dispatch(AllUserAction())
    }, [dispatch, navigate, userInfo])

    return (
        <>
            <AdminSidenavbar />
            <main className="content" style={{ "minHeight": "300px" }}>
                <AdminTopnavbar />
                <section className="user_profl_sec">
                    <div className="row mb-2">
                        <div className="col-sm-12 col-sm-12 d-flex flex-row-reverse">
                            <button type="button" className="btn forms_btn" data-bs-toggle="modal" data-bs-target="#formModal" data-bs-whatever="@mdo">Add User</button>
                        </div>
                    </div>

                    <div className="row">
                        {loading ? <MagnifineLoader /> : error ? <ErrorAlert variant="danger" children={error} /> : (UserList.length === 0) ? <ErrorAlert variant="success" children={"No User Found"} /> :
                            UserList.map(((UserList, index) => {
                                return (
                                    <div className="col-sm-6 col-lg-4" key={index}>
                                        <div className="api_item" style={{ "minHeight": "231px" }} key={UserList.userId}>
                                            <b className="api_title" id="" style={{ "fontSize": "18px" }}>User Name: <span>{UserList.firstName} {UserList.lastName}</span></b>
                                            <span className="api_secret" id="">User Email: <span>{UserList.email}</span></span>
                                            <span className="client_id" id="">User Phone: <span>{UserList.phone}</span></span>
                                            <div className="btn_grps">
                                                <Link to={`/admin/view-api/${UserList.userId}`} className="btn create_strategy">View API</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))}
                    </div>
                </section>
            </main>
            <AdminAddUserModal />
        </>
    );
}