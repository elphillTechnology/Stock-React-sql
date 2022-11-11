import React, { useState } from 'react'
import '../../css/ModalStyle.css'
import $ from 'jquery'

$(document).ready(function () {
    $(".eye_icon").click(function () {
        $(this).toggleClass("activeEye");
    })
})

function changeinputAttribute() {
    let inputField = document.getElementById('input_password');
    if (inputField.type === 'password') {
        inputField.setAttribute('type', 'text');
    } else {
        inputField.setAttribute('type', 'password');
    }
}

function UserStrategyPassword() {

    const [password, setPassword] = useState("")

    const HandelSubmit = () => {
        console.log(password);
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="password_area">
                            <input type="password" placeholder="Password" className="form-control" id="input_password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="eye_icon" onClick={changeinputAttribute}>
                                <i className="fa-regular fa-eye"></i>
                                <i className="fa-solid fa-eye-slash"></i>
                            </div>
                        </div>
                        <button className="btn submit_password" type='submit' onClick={HandelSubmit}>submit</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserStrategyPassword