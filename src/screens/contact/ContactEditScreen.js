import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Components */
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import ButtonGoBack from "../../components/ButtonGoBack";
import Select from "../../components/Select";
/* Constants */
import {
    CONTACT_UPDATE_RESET,
    CONTACT_DETAILS_RESET,
    CONTACT_DELETE_RESET,
} from "../../constants/contactConstants";

/* Actions */
import {
    updateContact,
    listContactDetails,
} from "../../actions/contactActions";
import { listGroups } from "../../actions/groupActions";
import LoaderHandler from "../../components/loader/LoaderHandler";

const ContactEditScreen = ({ history, match }) => {
    const contactId = parseInt(match.params.id);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [groupId, setGroupId] = useState("");
    const dispatch = useDispatch();

    const groupList = useSelector((state) => state.groupList);
    const { groups } = groupList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //contact details state
    const contactDetails = useSelector((state) => state.contactDetails);
    const { loading, error, contact } = contactDetails;

    //contact update state
    const contactUpdate = useSelector((state) => state.contactUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = contactUpdate;

    useEffect(() => {
        //after update redirect to users
        if (successUpdate) {
            dispatch({ type: CONTACT_UPDATE_RESET });
            dispatch({ type: CONTACT_DETAILS_RESET });
            dispatch({ type: CONTACT_DELETE_RESET });
            history.push("/contact");
        }

        //load product data
        if (contact) {
            if (!contact.name || contact.id !== contactId) {
                dispatch(listContactDetails(contactId));
            } else {
                //set states
                setName(contact.name);
                setPhone(contact.phone);
                setEmail(contact.email);
                setGroupId(parseInt(contact.groupId));
            }
        }
    }, [dispatch, history, contactId, contact, successUpdate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorsCheck = {};

        if (!name) {
            errorsCheck.name = "Name is required";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            dispatch(
                updateContact({
                    id: contactId,
                    name,
                    phone,
                    email,
                    groupId
                })
            );
        }
    };
    const renderGroupsSelect = () => (
        <Select
            data={groupId}
            setData={setGroupId}
            items={groups}
            search={searchGroup}
        />
    );

    const searchGroup = (e) => {
        dispatch(listGroups(e.target.value));
    };

    const renderForm = () => (
        <form onSubmit={handleSubmit}>
            <Input
                name={"name"}
                type={"text"}
                data={name}
                setData={setName}
                errors={errors}
            />
             <Input
                name={"email"}
                type={"email"}
                data={email}
                setData={setEmail}
                errors={errors}
            />
            <Input
                name={"phone"}
                type={"text"}
                data={phone}
                setData={setPhone}
                errors={errors}
            />
            {renderGroupsSelect()}
            {errors.contact && (
                <Message message={errors.contact} color={"warning"} />
            )}
            <hr />
            <button type="submit" className="btn btn-success">
                Submit
            </button>
        </form>
    );

    return (
        <>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Contacts"} />
            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    <ButtonGoBack history={history} />
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Edit Contact
                                    </h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <LoaderHandler
                                        loading={loadingUpdate}
                                        error={errorUpdate}
                                    />
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        render={renderForm}
                                    />
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>
        </>
    );
};

export default ContactEditScreen;
