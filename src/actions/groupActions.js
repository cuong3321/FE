import axios from "axios";
import {
    GROUP_LIST_REQUEST,
    GROUP_LIST_SUCCESS,
    GROUP_LIST_FAIL,
    GROUP_CREATE_REQUEST,
    GROUP_CREATE_SUCCESS,
    GROUP_CREATE_FAIL,
    GROUP_DETAILS_REQUEST,
    GROUP_DETAILS_SUCCESS,
    GROUP_DETAILS_FAIL,
    GROUP_UPDATE_REQUEST,
    GROUP_UPDATE_SUCCESS,
    GROUP_UPDATE_FAIL,
    GROUP_DELETE_REQUEST,
    GROUP_DELETE_SUCCESS,
    GROUP_DELETE_FAIL,
} from "../constants/groupConstants";

//get all groups with pagination
export const listGroups =
    (keyword = "", pageNumber = "") =>
    async (dispatch, getState) => { 
        try {
            dispatch({
                type: GROUP_LIST_REQUEST,
            });
            //alert(555)
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
            //console.log(config);return false;
            //get all groups
            const { data } = await axios.get(
                process.env.REACT_APP_BACKEND_URL+`/api/groups?keyword=${keyword}&pageNumber=${pageNumber}`,
                config
            );

            dispatch({
                type: GROUP_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GROUP_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

//create a group
export const createGroup = (group) => async (dispatch, getState) => {
    const { name } = group;

    try {
        dispatch({
            type: GROUP_CREATE_REQUEST,
        });

        //get group from state
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

        //create group
        const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/groups", { name }, config);
        dispatch({
            type: GROUP_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GROUP_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//get group details
export const listGroupDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GROUP_DETAILS_REQUEST });

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

        //api call to get group
        const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+`/api/groups/${id}`, config);
        dispatch({
            type: GROUP_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GROUP_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//update a group
export const updateGroup = (group) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GROUP_UPDATE_REQUEST,
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

        //update group
        const { data } = await axios.put(
            process.env.REACT_APP_BACKEND_URL+`/api/groups/${group.id}`,
            group,
            config
        );
        dispatch({
            type: GROUP_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GROUP_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//delete group
export const deleteGroup = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GROUP_DELETE_REQUEST,
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

        //api call to delete group
        await axios.delete(process.env.REACT_APP_BACKEND_URL+`/api/groups/${id}`, config);
        dispatch({
            type: GROUP_DELETE_SUCCESS,
        });
        window.location.href = "/group";
    } catch (error) {
        dispatch({
            type: GROUP_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
