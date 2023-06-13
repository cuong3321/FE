import {
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_FAIL,
    CONTACT_LIST_RESET,
    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_SUCCESS,
    CONTACT_CREATE_FAIL,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,
    CONTACT_DETAILS_FAIL,
    CONTACT_DETAILS_RESET,
    CONTACT_UPDATE_REQUEST,
    CONTACT_UPDATE_SUCCESS,
    CONTACT_UPDATE_FAIL,
    CONTACT_UPDATE_RESET,
    CONTACT_DELETE_REQUEST,
    CONTACT_DELETE_SUCCESS,
    CONTACT_DELETE_FAIL,
    CONTACT_DELETE_RESET,
} from "../constants/contactConstants";

export const contactListReducer = (
    state = { loading: true, contacts: [] },
    action
) => {
    switch (action.type) {
        case CONTACT_LIST_REQUEST:
            return { loading: true, contacts: [] };
        case CONTACT_LIST_SUCCESS:
            return {
                loading: false,
                contacts: action.payload.contacts,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case CONTACT_LIST_FAIL:
            return { loading: false, error: action.payload };
        case CONTACT_LIST_RESET:
            return { contacts: [] };
        default:
            return state;
    }
};

export const contactCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_CREATE_REQUEST:
            return { loading: true };
        case CONTACT_CREATE_SUCCESS:
            return { loading: false, success: true };
        case CONTACT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const contactDetailsReducer = (state = { contact: {} }, action) => {
    switch (action.type) {
        case CONTACT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case CONTACT_DETAILS_SUCCESS:
            return { loading: false, contact: action.payload };
        case CONTACT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case CONTACT_DETAILS_RESET:
            return { contact: {} };
        default:
            return state;
    }
};

export const contactUpdateReducer = (state = { contact: {} }, action) => {
    switch (action.type) {
        case CONTACT_UPDATE_REQUEST:
            return { loading: true };
        case CONTACT_UPDATE_SUCCESS:
            return { loading: false, success: true, contact: action.payload };
        case CONTACT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case CONTACT_UPDATE_RESET:
            return { contact: {} };
        default:
            return state;
    }
};

export const contactDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_DELETE_REQUEST:
            return { loading: true };
        case CONTACT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case CONTACT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case CONTACT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};
