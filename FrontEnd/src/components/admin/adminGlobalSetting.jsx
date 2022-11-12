import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminSidenavbar from './adminSidenavbar'
import AdminTopnavbar from './adminTopnavbar'
import '../../css/global-settings.css'

export default function AdminGlobalSetting() {

    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    return (
        <>
            <AdminSidenavbar />
            <main className="content" style={{ "minHeight": "300px" }}>
                <AdminTopnavbar />
                <div className="global_settings_area">
                    {/* <h6 className='global_title'><span><i className="fa-solid fa-gear"></i></span> Global Settings</h6> */}
                    <div className="global_area_inner">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="conditional_input mb-3" style={{"position": "relative"}}>
                                    <div className="checkarea">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Global Max Profit(+)
                                        </label>
                                    </div>
                                    <input type="text" placeholder='0000' className='form-control' id="global_max_Profit" />
                                    <div className="questio_mark"><strong><i className='fa fa-question'></i></strong>
                                        <div className="quatation_area">
                                            <p>gp</p>
                                            <p>gl</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="col-sm-6">
                                <div className="conditional_input mb-3">
                                    <div className="checkarea">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Expiry Date
                                        </label>
                                    </div>
                                    <input type="date" placeholder='0000' className='form-control' id='expiry_date'/>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="conditional_input mb-3">
                                    <div className="checkarea">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Global Max Loss(-)
                                        </label>
                                    </div>
                                    <input type="text" placeholder='0000' className='form-control' id='global_max_loss' />
                                </div>

                                <div className="conditional_input mb-3">
                                    <span>Entry Order Type</span>
                                    <select className="form-select entry_type" aria-label="Default select example">
                                        <option >Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <div className="bordered_area mb-3" id='Limit Order configuration'>
                                    <div className="limit_buffer mb-3">
                                        <span>Limit Buffer <strong><i className="fa-solid fa-question"></i></strong> </span>
                                        <div className="limit_buffer_inputs">
                                            <select className="form-select entry_type" aria-label="Default select example">
                                                <option >%</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                            <input type="text" placeholder='0000' className='form-control' />
                                        </div>
                                    </div>

                                    <div className="limit_buffer">
                                        <span>Secondary to modify order</span>
                                        <div className="limit_buffer_inputs">
                                            <input type="text" placeholder='0000' className='form-control modify_order' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="bordered_area mb-3" id='protect profit'>
                                    <div className="mode mb-3">
                                        <span>Mode</span>
                                        <select className="form-select" aria-label="Default select example">
                                            <option >Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>

                                    <div className="mode_input mb-2">
                                        <span>If Profits Reaches </span>
                                        <input type="text" placeholder='0' className='form-control' />
                                    </div>

                                    <div className="mode_input mb-2">
                                        <span>If Profits Reaches </span>
                                        <input type="text" placeholder='0' className='form-control' />
                                    </div>

                                    <div className="mode_input mb-2">
                                        <span>If Profits Reaches </span>
                                        <input type="text" placeholder='0' className='form-control' />
                                    </div>

                                    <div className="mode_input">
                                        <span>If Profits Reaches </span>
                                        <input type="text" placeholder='0' className='form-control' />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="bordered_area" id='Execution Mode'>
                                    <div className="radio_area">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Default radio
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Default checked radio
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="bordered_area" id='quantity multipilar'>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="multipilar">
                                                <span>Nifty</span>
                                                <input type="text" className='form-control nifty_input  ' />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="multipilar">
                                                <span>Banknifty</span>
                                                <input type="text" className='form-control nifty_input  ' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="conditional_input mb-3">
                                    <div className="checkarea">
                                        <input className="form-check-input" type="checkbox" id="flexCheckDefault" value="" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">Telegram Msg</label>
                                    </div>
                                    <select className="form-select tele_msg" aria-label="Default select example">
                                        <option >Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="btn_submit_area">
                                    <button className='btn btn-update'>Configure Strategy</button>
                                    <button className='btn btn-update'>Start</button>
                                    <span><button className='btn btn-update'>Update</button>
                                        <strong className='ques_btn'><i className='fa fa-question'></i>
                                            <div className="quatation_area">
                                                <p>gp</p>
                                                <p>gl</p>
                                            </div>
                                        </strong>
                                    </span>
                                    <button className='btn btn-update'>Exit All</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
