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


// import contacts
//create a contact
export const shareContact = (userId, contactId, isShared) => async (dispatch, getState) => {
    //console.log(contactId);return false;
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
        const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/userContacts", {userId, contactId, isShared}, config);

        if (data) {
            alert(data.message);
        }
     
    } catch (error) {
        alert('action fail');
         dispatch({
            type: CONTACT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
