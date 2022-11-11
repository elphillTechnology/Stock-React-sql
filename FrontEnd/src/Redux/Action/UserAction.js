import axios from 'axios'
import { ALL_USER_DETAILS_FAILS, ALL_USER_DETAILS_REQUEST, ALL_USER_DETAILS_SUCCESS, USER_LOGIN_FAILS, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAILS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../Constants/UserConstants'


export const UserLoginAction = (details) => async (dispatch) => {
    try {
        let email = details.loginemail
        let password = details.loginpassword
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = { headers: { "Contnet-Type": "application/json" } };
        const { data } = await axios.post("/user/login", { email, password }, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}


export const UserRegsiterAction = (details, broker, brokerId) => async (dispatch) => {
    try {
        let email = details.email_id
        let password = details.password
        let confirm_password = details.password
        let firstName = details.firstname
        let lastName = details.lastname
        let phone = Number(details.phone_no)
        let dob = details.dob
        let panNumber = details.pan_number
        dispatch({ type: USER_REGISTER_REQUEST })
        if (broker === "") {
            let Nobroker = "No Broker"
            let NobrokerId = "No BrokerId"
            const config = { headers: { "Contnet-Type": "application/json" } };
            const { data } = await axios.post("/user/signup", { email: email, password: password, confirm_password: confirm_password, firstName: firstName, lastName: lastName, phone: phone, dob: dob, panNumber: panNumber, broker: Nobroker, brokerId: NobrokerId }, config);
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            dispatch(AllUserAction())
        } else {
            const config = { headers: { "Contnet-Type": "application/json" } };
            const { data } = await axios.post("/user/signup", { email, password, confirm_password, firstName, lastName, phone, dob, panNumber, broker, brokerId }, config);
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            dispatch(AllUserAction())
        }
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const AllUserAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_USER_DETAILS_REQUEST })
        const { userLogin: { userInfo }, } = getState();
        const config = { headers: { "Contnet-Type": "application/json", "Authorization": `Bearer ${userInfo.token}` } }
        const { data } = await axios.get("/user/", config)
        dispatch({ type: ALL_USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ALL_USER_DETAILS_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const UserLogout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
}

