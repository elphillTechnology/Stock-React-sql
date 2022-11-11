import React, { useState } from 'react';
// import { useForm } from "react-hook-form";
import Sidenavbar from "./sidenavbar";

export default function Alluser() {

    return (
        <>
            <Sidenavbar />
            <main className="content">
                <section className="user_profl_sec">
                    {/* <div className="row">
                        <div className="col-sm-12">
                            <button className="btn profile_btn" type="button" data-bs-toggle="modal" data-bs-target="#exampleModalXl" data-bs-whatever="@mdo">Add User</button>
                        </div>
                    </div> */}
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
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );

}

