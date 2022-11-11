import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
export default function CreateStratagyModal(props) {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        // dispatch(addprofile(data))
        // console.log(data)
        reset()
    };

    const [strategyType, setStrategyType] = useState("time_based_entry"); //wait&trade / range_breakout
    const [allStrategyType, setAllStrategyType] = useState([{ "time_based_entry": "Time Based Entry" }, { "wait&trade": "Wait & Trade" }, { "range_breakout": "Range Breakout" }]);


    return (
        <>
            <div className="modal fade show" id="addApiModal" tabIndex="-1" aria-labelledby="exampleModalXlLabel" aria-modal="true" role="dialog" style={{ display: "none" }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title h4" id="exampleModalXlLabel">Create Strategy For User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="">
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="alice_name" className="form-label">Alice Name</label>
                                                <input type="text" className="form-control" id="alice_name" placeholder='Alice Name' />
                                            </div>
                                            <div className="col-md-8 mb-3">
                                                <label htmlFor="apikey" className="form-label">Strategy Type</label>
                                                <select className="form-select" aria-label="Default select example" onChange={(e) => setStrategyType(e.target.value)}>
                                                    {allStrategyType.map((strategy) => (
                                                        <option key={Object.keys(strategy)} value={Object.keys(strategy)}>{Object.values(strategy)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>


                                        {/* <div id="" className="form-text">We'll never share your email with anyone else.</div> */}
                                        {(strategyType === "time_based_entry") && (
                                            <>
                                                <div className='row'>

                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="apisecret" className="form-label">Underlying</label>
                                                        <select className="form-select" aria-label="Default select example" >
                                                            <option value={"NIFTY"}>NIFTY</option>
                                                            <option value={"BANKNIFTY"}>BANKNIFTY</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="entry_time" className="form-label">Entry Time</label>
                                                        <input type="text" className="form-control" id="entry_time" placeholder='00:00:00' />
                                                    </div>

                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="exit_time" className="form-label">Exit Time</label>
                                                        <input type="text" className="form-control" id="exit_time" placeholder='00:00:00' />
                                                    </div>

                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="no_of_lots" className="form-label">No of Lots</label>
                                                        <input type="number" className="form-control" id="no_of_lots" />
                                                    </div>

                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="entry_type" className="form-label">Entry Type</label>
                                                        <select className="form-select" aria-label="Default select example" >
                                                            <option value={"buy"}>Buy</option>
                                                            <option value={"sell"}>Sell</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="product_type" className="form-label">Product Type</label>
                                                        <select className="form-select" aria-label="Default select example" >
                                                            <option value={"MIS"}>MIS</option>
                                                            <option value={"NRML"}>NRML</option>
                                                        </select>
                                                    </div>

                                                    {/* <div className="col-md-2 mb-3">
                                                        <label htmlFor="strick_price" className="form-label">Strike price according to ATM</label>
                                                        <input type="text" className="form-control" id="strick_price" />
                                                    </div> */}

                                                    {/* <div className="col-md-2 mb-3">
                                                        <label htmlFor="strick_price_option" className="form-label">Strike price according to option price</label>
                                                        <input type="text" className="form-control" id="strick_price_option" placeholder='100, 80, 50' />
                                                    </div> */}
                                                    {/* <div className="col-md-2 mb-3">
                                                        <label htmlFor="stoploss" className="form-label">Stoploss</label>
                                                        <input type="text" className="form-control" id="stoploss" />
                                                    </div> */}
                                                    {/* <div className="col-md-2 mb-3">
                                                        <label htmlFor="target" className="form-label">Target</label>
                                                        <input type="text" className="form-control" id="target" />
                                                    </div> */}
                                                    {/* <div className="col-md-2 mb-3">
                                                        <label htmlFor="trailing" className="form-label">Trailing</label>
                                                        <input type="text" className="form-control" id="trailing" />
                                                    </div> */}
                                                    {/* <div className="col-md-2 mb-3">
                                                        <label htmlFor="max_profit" className="form-label">Max Profit</label>
                                                        <input type="text" className="form-control" id="max_profit" />
                                                    </div> */}
                                                    {/* <div className="col-md-2 mb-3">
                                                        <label htmlFor="max_loss" className="form-label">Max Loss</label>
                                                        <input type="text" className="form-control" id="max_loss" />
                                                    </div> */}

                                                    {/* <div className="col-md-2 mb-3">
                                                        <label htmlFor="modify_cost" className="form-label">Modify Order Cost to Cost</label>
                                                        <input type="text" className="form-control" id="modify_cost" />
                                                    </div> */}
                                                    {/* <div className="col-md-2 mb-3">
                                                        <label htmlFor="order_type" className="form-label">Order type MIS , NRML</label>
                                                        <input type="text" className="form-control" id="order_type" />
                                                    </div> */}
                                                </div>
                                                <div className="row">

                                                    <div className="col-md-4">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-text">
                                                                <input className="form-check-input mt-0" id='squre_off_exit_time_checkbox' type="checkbox" onClick={(e)=>{document.getElementById("squre_off_exit_time").disabled = !document.getElementById("squre_off_exit_time").disabled ;}} />
                                                                <span className="form-check-label" htmlFor="squre_off_exit_time_checkbox" >Squre off Exit Time</span>
                                                            </div>
                                                            <input type="text" className="form-control" id='squre_off_exit_time' placeholder='00:00:00' aria-label="Text input with checkbox" disabled />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-text">
                                                                <input type="checkbox" className="form-check-input mt-0" id='strategy_max_profite_per_lot_checkbox' onClick={(e)=>{document.getElementById("strategy_max_profite_per_lot").disabled = !document.getElementById("strategy_max_profite_per_lot").disabled;  }} />
                                                                <span className="form-check-label" htmlFor="strategy_max_profite_per_lot_checkbox" >Strategy Max profite Per lot</span>
                                                            </div>
                                                            <input type="number" className="form-control" id='strategy_max_profite_per_lot' aria-label="Text input with checkbox" disabled />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-text">
                                                                <input className="form-check-input mt-0" type="checkbox" onClick={(e)=>{ document.getElementById("strategy_max_loss_per_lot").disabled = !document.getElementById("strategy_max_loss_per_lot").disabled }} />
                                                                <span className="form-check-label">Strategy Max Loss Per Lot</span>
                                                            </div>
                                                            <input type="number" className="form-control" id='strategy_max_loss_per_lot' aria-label="Text input with checkbox" disabled />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <h5>Contract Selection</h5>
                                                    <div className="col-md-3 mb-3">
                                                        <label htmlFor="product_type" className="form-label">Mode</label>
                                                        <select className="form-select" aria-label="Default select example" >
                                                            <option value={"1"}>Entry By ATM Points</option>
                                                            <option value={"2"}>NRML</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-3 mb-3">
                                                        <label htmlFor="product_type" className="form-label">Mode</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-text">
                                                                <input type="checkbox" className="form-check-input mt-0" id="ce_strickout_check" aria-label="Checkbox for following text input" onClick={(e)=>{document.getElementById("ce_cp_select").disabled = !document.getElementById("ce_cp_select").disabled}} />
                                                                <span className="form-check-label">CE-CP</span>
                                                            </div>
                                                            <select className="form-select" aria-label="Default select example" id='ce_cp_select' disabled>
                                                                <option value={"cp"}>CP-</option>
                                                                <option value={"ce"}>CE-</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-3 mb-3">
                                                        <label htmlFor="product_type" className="form-label">Mode</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-text">
                                                                <input className="form-check-input mt-0" id="ce_strickout_check" type="checkbox" aria-label="Checkbox for following text input" onClick={()=>{document.getElementById('pe_cp_select').disabled = !document.getElementById('pe_cp_select').disabled}} />
                                                                <span className="form-check-label" id="ce_strickout_check">PE-CP</span>
                                                            </div>
                                                            <select className="form-select" id='pe_cp_select' aria-label="Default select example" disabled>
                                                                <option value={"cp"}>CP-</option>
                                                                <option value={"ce"}>CE-</option>
                                                            </select>
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="row">
                                                    <h5 className=''>Target and Loss Configarations</h5>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="gender">Target Stop/Loss</label>
                                                        <select className="form-select mb-0" id="gender" aria-label="Gender select example">
                                                            <option value="2">Indivisual Leg</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="gender">Enable Target</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-text">
                                                                <input className="form-check-input mt-0" type="checkbox" onClick={(e)=>{document.getElementById("enable_target_input").disabled = !document.getElementById("enable_target_input").disabled; document.getElementById("enable_target_select").disabled = !document.getElementById("enable_target_select").disabled}} />
                                                                <span className="form-check-label" id="ce_strickout_check">Enable Target</span>
                                                            </div>
                                                            <input type="number" className="form-control" id='enable_target_input' aria-label="Text input with checkbox" disabled />
                                                            <select className="form-select" id='enable_target_select' aria-label="Default select example" disabled>
                                                                <option value="cp">%</option>
                                                                <option value="ce">Pts</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label htmlFor="gender">Enable Stop Loss</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-text">
                                                                <input type="checkbox" className="form-check-input mt-0"  onClick={(e)=>{document.getElementById("enable_stop_loss_input").disabled = !document.getElementById("enable_stop_loss_input").disabled; document.getElementById("enable_stop_loss_select").disabled = !document.getElementById("enable_stop_loss_select").disabled;}} />
                                                                <span className="form-check-label" id="ce_strickout_check">Enable Stop Loss</span>
                                                            </div>
                                                            <input type="number" className="form-control" id='enable_stop_loss_input' aria-label="Text input with checkbox" disabled />
                                                            <select className="form-select" id='enable_stop_loss_select' aria-label="Default select example" disabled>
                                                                <option value="cp">%</option>
                                                                <option value="ce">Pts</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="squre_off_type" className="form-label">Squre off Type</label>
                                                        <select className="form-select" id='squre_off_type' aria-label="Default select example">
                                                            <option value="NIFTY">One Leg</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <h5>Re Entry / Re Execute</h5>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="re_entry_mode" className="form-label">Mode</label>
                                                        <select className="form-select" id='re_entry_mode' aria-label="Default select example">
                                                            <option value="NIFTY">Ignore</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="re_entry_type" className="form-label">Re Entry Type</label>
                                                        <select className="form-select" id='re_entry_type' aria-label="Default select example">
                                                            <option value="NIFTY">Candle</option>
                                                            <option value="NIFTY">Ltp</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="time_frame" className="form-label">Time Frame</label>
                                                        <select className="form-select" id='time_frame'  aria-label="Default select example">
                                                            <option value="NIFTY">minute</option>
                                                            <option value="NIFTY">5 minute</option>
                                                            <option value="NIFTY">10 minute</option>
                                                            <option value="NIFTY">15 minute</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="no_of_re_entries" className="form-label">No of re-entries</label>
                                                        <input type="number" className="form-control" id="no_of_re_entries" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="stop_re_entry_time" className="form-label">Stop re-entry Time</label>
                                                        <input type="text" className="form-control" id="stop_re_entry_time" placeholder='00:00:00' />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2 mb-3">
                                                            <input className="form-check-input" type="checkbox" id="monday" />
                                                            <label className="form-check-label" htmlFor="monday">Monday</label>
                                                        </div>
                                                        <div className="col-md-2 mb-3">
                                                            <input className="form-check-input" type="checkbox" id="tuesday" />
                                                            <label className="form-check-label" htmlFor="tuesday">Tuesday</label>
                                                        </div>
                                                        <div className="col-md-2 mb-3">
                                                            <input className="form-check-input" type="checkbox" id="wednesday" />
                                                            <label className="form-check-label" htmlFor="wednesday">Wednesday</label>
                                                        </div>
                                                        <div className="col-md-2 mb-3">
                                                            <input className="form-check-input" type="checkbox" id="thursday" />
                                                            <label className="form-check-label" htmlFor="thursday">Thursday</label>
                                                        </div>
                                                        <div className="col-md-2 mb-3">
                                                            <input className="form-check-input" type="checkbox" id="friday" />
                                                            <label className="form-check-label" htmlFor="friday">Friday</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {(strategyType === "wait&trade") && (
                                            <>
                                                <div className="mb-3">
                                                    <label htmlFor="apisecret" className="form-label">Market Indices</label>
                                                    <select className="form-select" aria-label="Default select example" >
                                                        <option value={"NIFTY"}>NIFTY</option>
                                                        <option value={"BANKNIFTY"}>BANKNIFTY</option>
                                                    </select>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="bkr" className="form-label">Break Out Range</label>
                                                        <input type="text" className="form-control" id="bkr" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="entry_time" className="form-label">Entry Time</label>
                                                        <input type="text" className="form-control" id="entry_time" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="exit_time" className="form-label">Exit Time</label>
                                                        <input type="text" className="form-control" id="exit_time" />
                                                    </div>

                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="strick_price" className="form-label">Strike price according to ATM</label>
                                                        <input type="text" className="form-control" id="strick_price" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="strick_price_option" className="form-label">Strike price according to option price 100, 80, 50</label>
                                                        <input type="text" className="form-control" id="strick_price_option" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="stoploss" className="form-label">Stoploss</label>
                                                        <input type="text" className="form-control" id="stoploss" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="target" className="form-label">Target</label>
                                                        <input type="text" className="form-control" id="target" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="trailing" className="form-label">Trailing</label>
                                                        <input type="text" className="form-control" id="trailing" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="max_profit" className="form-label">Max Profit</label>
                                                        <input type="text" className="form-control" id="max_profit" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="max_loss" className="form-label">Max Loss</label>
                                                        <input type="text" className="form-control" id="max_loss" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="order_type" className="form-label">Order type MIS , NRML</label>
                                                        <input type="text" className="form-control" id="order_type" />
                                                    </div>
                                                </div>
                                            </>

                                        )}

                                        {(strategyType === "range_breakout") && (

                                            <>

                                                <div className="mb-3">
                                                    <label htmlFor="apisecret" className="form-label">Market Indices</label>
                                                    <select className="form-select" aria-label="Default select example" >
                                                        <option value={"NIFTY"}>NIFTY</option>
                                                        <option value={"BANKNIFTY"}>BANKNIFTY</option>
                                                    </select>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="exit_time" className="form-label">Exit Time</label>
                                                        <input type="text" className="form-control" id="exit_time" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="bor" className="form-label">Break Out Range</label>
                                                        <input type="text" className="form-control" id="bor" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="strick_price" className="form-label">Strike Price According to ATM</label>
                                                        <input type="text" className="form-control" id="strick_price" />
                                                    </div>

                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="stoploss" className="form-label">Stoploss</label>
                                                        <input type="text" className="form-control" id="stoploss" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="target" className="form-label">Target</label>
                                                        <input type="text" className="form-control" id="target" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="trailing" className="form-label">Trailing</label>
                                                        <input type="text" className="form-control" id="trailing" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="max_profit" className="form-label">Max Profit</label>
                                                        <input type="text" className="form-control" id="max_profit" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="max_loss" className="form-label">Max Loss</label>
                                                        <input type="text" className="form-control" id="max_loss" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="max_loss" className="form-label">Modify Order Cost to Cost</label>
                                                        <input type="text" className="form-control" id="max_loss" />
                                                    </div>
                                                    <div className="col-md-2 mb-3">
                                                        <label htmlFor="order_type" className="form-label">Order Type MIS, NRML</label>
                                                        <input type="text" className="form-control" id="order_type" />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

