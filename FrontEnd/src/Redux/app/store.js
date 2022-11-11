import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { AllUserReducer, UserLoginReducer, UserRegisterReducer } from '../Reducer/UserReducer'
import { AddApiReducer, CreateApiKeyReducer, GetAllApisReducer, GetApiReducer, GetUserApiReducer } from '../Reducer/ApiReducer'

const userInfoFromStore = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const reducer = combineReducers({
    userLogin: UserLoginReducer,
    userRegister: UserRegisterReducer,
    AllUser: AllUserReducer,
    AddApi: AddApiReducer,
    GetApi: GetApiReducer,
    GetAllApi: GetAllApisReducer,
    GetUserApi: GetUserApiReducer,
    ApiKey: CreateApiKeyReducer
})

const intialState = {
    userLogin: { userInfo: userInfoFromStore }
}

const middleware = [thunk]

const configureStore = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export default configureStore