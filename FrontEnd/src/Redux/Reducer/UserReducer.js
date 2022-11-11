import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILS, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILS, ALL_USER_DETAILS_REQUEST, ALL_USER_DETAILS_SUCCESS, ALL_USER_DETAILS_FAILS } from '../Constants/UserConstants'

export const UserLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case USER_LOGIN_FAILS:
            return { loading: false, error: action.payload };

        case USER_LOGOUT:
            return {};

        default:
            return state;
    }
}

export const UserRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true, userDetails: action.payload };

        case USER_REGISTER_FAILS:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const AllUserReducer = (state = { UserList : [] }, action) => {
    switch (action.type) {
        case ALL_USER_DETAILS_REQUEST:
            return { loading: true, UserList: [] }
        
        case ALL_USER_DETAILS_SUCCESS:
            return { loading: false, UserList: action.payload }
        
        case ALL_USER_DETAILS_FAILS:
            return { loading: false, error: action.payload }
    
        default:
            return state;
    }
}

