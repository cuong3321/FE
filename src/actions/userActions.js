import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DETAILS_RESET,
} from "./../constants/userConstants";

//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        //get login data
        const { data } = await axios.post(
            process.env.REACT_APP_BACKEND_URL+"/api/users/login",
            { email, password },
            config
        );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        //set user info into local storage
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//logout
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LOGOUT });
};

//get all users
export const listUsers =
    (keyword = "", pageNumber = "") =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_LIST_REQUEST,
            });

            //get user from state
            const {
                userLogin: { userInfo },
            } = getState();

            //headers
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            //get all users
            const { data } = await axios.get(
                process.env.REACT_APP_BACKEND_URL+`/api/users?keyword=${keyword}&pageNumber=${pageNumber}&userId=${userInfo._id}`,
                config
            );
            dispatch({
                type: USER_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

//register an user
export const register = (user) => async (dispatch, getState) => {
    const { name, email, password, isAdmin } = user;

    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();

        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //get login data
        const { data } = await axios.post(
            process.env.REACT_APP_BACKEND_URL+"/api/users",
            { name, email, password, isAdmin },
            config
        );
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//signup an user
export const signup = (user) => async (dispatch, getState) => {
    const { name, email, password, cfpassword, isAdmin } = user;
    if (password !== cfpassword) {
        return dispatch({
            type: USER_LOGIN_FAIL,
            payload: 'confirm password not match'
        });
    }
    //console.log(password);return false;
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();

        //headers
        const config = {
            headers: {
                "Content-Type": "application/json"
                //Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //get login data
        const { data } = await axios.post(
            process.env.REACT_APP_BACKEND_URL+"/api/users/signup",
            { name, email, password, isAdmin },
            config
        );
        if (data) {
            alert('register success');
            window.location.href = "/login";
        }
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });
    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//get user details
export const listUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();

        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //api call to get product
        const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+`/api/users/${id}`, config);
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//update an user
export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //update user
        const { data } = await axios.put(process.env.REACT_APP_BACKEND_URL+`/api/users/${user.id}`, user, config);
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//delete user
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();
        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //api call to delete user
        await axios.delete(process.env.REACT_APP_BACKEND_URL+`/api/users/${id}`, config);
        dispatch({
            type: USER_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//update profile
export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //update user
        const { data } = await axios.put(
            `/api/users/profile/${user.id}`,
            user,
            config
        );
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
