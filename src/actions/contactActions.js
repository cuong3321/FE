import axios from "axios";
import {
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_FAIL,
    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_SUCCESS,
    CONTACT_CREATE_FAIL,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,
    CONTACT_DETAILS_FAIL,
    CONTACT_UPDATE_REQUEST,
    CONTACT_UPDATE_SUCCESS,
    CONTACT_UPDATE_FAIL,
    CONTACT_DELETE_REQUEST,
    CONTACT_DELETE_SUCCESS,
    CONTACT_DELETE_FAIL,
} from "../constants/contactConstants";

//get all contacts with pagination
export const listContacts =
    (keyword = "", pageNumber = "", filterGroup="") =>
    async (dispatch, getState) => { 
        try {
            dispatch({
                type: CONTACT_LIST_REQUEST,
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
            //get all contacts
            const { data } = await axios.get(
                process.env.REACT_APP_BACKEND_URL+`/api/contacts?keyword=${keyword}&pageNumber=${pageNumber}&userId=${userInfo._id}&filterGroup=${filterGroup}`,
                config
            );
            //console.log(data);return false;
            dispatch({
                type: CONTACT_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CONTACT_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

//create a contact
export const createContact = (contact) => async (dispatch, getState) => {
    const { name, phone, email, groupId } = contact;

    try {
        dispatch({
            type: CONTACT_CREATE_REQUEST,
        });

        //get contact from state
        const {
            userLogin: { userInfo },
        } = getState();
        const userId = userInfo._id;
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //create contact
        const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/contacts", { name, phone, email, groupId, userId }, config);
        dispatch({
            type: CONTACT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CONTACT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//get contact details
export const listContactDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTACT_DETAILS_REQUEST });

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

        //api call to get contact
        const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+`/api/contacts/${id}`, config);
        dispatch({
            type: CONTACT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CONTACT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//update a contact
export const updateContact = (contact) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_UPDATE_REQUEST,
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

        //update contact
        const { data } = await axios.put(
            process.env.REACT_APP_BACKEND_URL+`/api/contacts/${contact.id}`,
            contact,
            config
        );
        dispatch({
            type: CONTACT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CONTACT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//delete contact
export const deleteContact = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_DELETE_REQUEST,
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

        //api call to delete contact
        await axios.delete(process.env.REACT_APP_BACKEND_URL+`/api/contacts/${id}`, config);
        dispatch({
            type: CONTACT_DELETE_SUCCESS,
        });
        window.location.href = "/contact";
    } catch (error) {
        dispatch({
            type: CONTACT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// import contacts
//create a contact
export const importContact = (contacts) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_CREATE_REQUEST,
        });

        //get contact from state
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
        const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/imports", {contacts, id:  userInfo._id}, config);
        dispatch({
            type: CONTACT_CREATE_SUCCESS,
            payload: data,
        });

        if (data) {
            alert('import success');
        }
    } catch (error) {
        dispatch({
            type: CONTACT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
