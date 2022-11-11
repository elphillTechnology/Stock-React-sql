import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Sidenavbar from "./sidenavbar";
import Topnavbar from "./topnavbar";
import { useSelector, useDispatch } from 'react-redux'
import Addapimodal from './addapimodal';
import Createstratagymodal from './createstratagymodal';
import { GetUserApiAction } from '../../Redux/Action/ApiAction';

export default function Allapi() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const GetUserApi = useSelector((state) => state.GetUserApi)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const { ApiLists } = GetUserApi



    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
        dispatch(GetUserApiAction())
    }, [navigate, userInfo, dispatch])

    return (
        <>
            <Sidenavbar />
            <main className="content">
                <Topnavbar />
                <section className="user_profl_sec">
                    <div className="row">
                        <div className="col-sm-12 col-sm-12 d-flex flex-row-reverse">
                            <button type="button" className="btn forms_btn" data-bs-toggle="modal" data-bs-target="#formModal" data-bs-whatever="@mdo">Add API</button>
                        </div>
                    </div>

                    <div className="row">
                        {(Allapi !== []) && ApiLists.map((ApiLists) => (
                            <div className="col-sm-6 col-lg-4" key={ApiLists.id}>
                                <div className="api_item" style={{ "height": "261.58px" }}>
                                    <b className="api_title" id="">api key: <span>{ApiLists.key}</span></b>
                                    <span className="api_secret" id="">api secret: <span>{ApiLists.secret}</span></span>
                                    <span className="client_id" id="">client id: <span>{ApiLists.clientApiId}</span></span>
                                    <div className="btn_grps">
                                        <button className="btn create_strategy" data-bs-toggle="modal" data-bs-target="#addApiModal">Create STRATEGY</button>
                                        <Link to={`/user/all-api/view-strategy/${ApiLists.id}`} className="btn view_strategy">View STRATEGIES</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </section>
            </main>

            <Addapimodal/>
            <Createstratagymodal/>

        </>
    );

}

