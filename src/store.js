import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    userLoginReducer,
    userListReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateReducer,
} from "./reducers/userReducers";

import {
    groupListReducer,
    groupCreateReducer,
    groupDetailsReducer,
    groupUpdateReducer,
} from "./reducers/groupReducers";

import {
    contactListReducer,
    contactCreateReducer,
    contactDetailsReducer,
    contactUpdateReducer,
} from "./reducers/contactReducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,

    contactList: contactListReducer,
    contactCreate: contactCreateReducer,
    contactDetails: contactDetailsReducer,
    contactUpdate: contactUpdateReducer,

    groupList: groupListReducer,
    groupCreate: groupCreateReducer,
    groupDetails: groupDetailsReducer,
    groupUpdate: groupUpdateReducer,

});

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
