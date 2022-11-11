import React from 'react';
import {Link} from "react-router-dom";
import Sidenavbar from "./sidenavbar";
import Topnavbar from "./topnavbar";

export default function Createstrategy(props) {

    return (
        <>
            <Sidenavbar />
            <main className="content">
                <Topnavbar />
                <section className="user_profl_sec">
                    <div className="row">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="apikey" className="form-label">API key</label>
                                <input type="text" className="form-control" id="apikey" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apisecret" className="form-label">API Secret</label>
                                <input type="text" className="form-control" id="apisecret" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apiid" className="form-label">API ID</label>
                                <input type="text" className="form-control" id="apiid" />
                            </div>
                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                            <Link to={"/all-api"} className="btn btn-primary">Back</Link>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );

}

