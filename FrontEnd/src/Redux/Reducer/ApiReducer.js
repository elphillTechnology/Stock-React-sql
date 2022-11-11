import { ADD_API_FAILS, ADD_API_REQUEST, ADD_API_SUCCESS, API_KEY_FAILS, API_KEY_REQUEST, API_KEY_SUCCESS, GET_ALL_API_FAILS, GET_ALL_API_REQUEST, GET_ALL_API_SUCCESS, GET_API_FAILS, GET_API_REQUEST, GET_API_SUCCESS, GET_USER_API_FAILS, GET_USER_API_REQUEST, GET_USER_API_SUCCESS } from "../Constants/ApiConstants";

// Admin Api Section
export const AddApiReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_API_REQUEST:
            return { loading: true }

        case ADD_API_SUCCESS:
            return { loading: false, ApiInfo: action.payload }

        case ADD_API_FAILS:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const GetApiReducer = (state = { ApiList: [] }, action) => {
    switch (action.type) {
        case GET_API_REQUEST:
            return { loading: true, ApiList: [] }

        case GET_API_SUCCESS:
            return { loading: false, ApiList: action.payload }

        case GET_API_FAILS:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const CreateApiKeyReducer = (state = {}, action) => {
    switch (action.type) {
        case API_KEY_REQUEST:
            return { loading: true }

        case API_KEY_SUCCESS:
            return { loading: false, ApiKeyS: action.payload }

        case API_KEY_FAILS:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

// User Api Section
export const GetAllApisReducer = (state = { ApiLists: [] }, action) => {
    switch (action.type) {
        case GET_ALL_API_REQUEST:
            return { loading: true, ApiLists: [] }

        case GET_ALL_API_SUCCESS:
            return { loading: false, ApiLists: action.payload }

        case GET_ALL_API_FAILS:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const GetUserApiReducer = (state = { ApiLists: [] }, action) => {
    switch (action.type) {
        case GET_USER_API_REQUEST:
            return { loading: true, ApiLists: [] }

        case GET_USER_API_SUCCESS:
            return { loading: false, ApiLists: action.payload }

        case GET_USER_API_FAILS:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}