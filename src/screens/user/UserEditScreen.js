


import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "../../components/Select";
/* Components */
import HeaderContent from "../../components/HeaderContent";
import ModalButton from "../../components/ModalButton";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import DataTableLoader from "../../components/loader/DataTableLoader";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
/* Actions */
import { createContact, listContacts, deleteContact } from "../../actions/contactActions";
import { listGroups } from "../../actions/groupActions";
import { listUserDetails, updateUser } from "../../actions/userActions";
/* Styles */
import { modalStyles } from "../../utils/styles";
import Toggle from "../../components/ToggleButton";
import ButtonGoBack from "../../components/ButtonGoBack";

const UserEditScreen = ({ history, match }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const userId = parseInt(match.params.id);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [groupId, setGroupId] = useState(null);

    const [errors, setErrors] = useState({});
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const groupList = useSelector((state) => state.groupList);
    const { groups } = groupList;

    const dispatch = useDispatch();

    const contactList = useSelector((state) => state.contactList);
    const { loading, error, contacts, page, pages } = contactList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    const contactCreate = useSelector((state) => state.contactCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = contactCreate;

    useEffect(() => { 
        //console.log(user)
        dispatch(listContacts(keyword, pageNumber));
        
        //load product data
        if (!user || !user.name || user.id !== userId) {
            dispatch(listUserDetails(userId));
        } else {
            //set states s
            setName(user.name);
            setEmail(user.email);
        }
          
        if (createSuccess) {
            setName("");
            setPhone("");
            setEmail("");
            setGroupId(null)
            setModalIsOpen(false);
        }

        if (!userInfo.isAdmin) {
            history.push("/not-authorized");
        }

    }, [dispatch, history, userInfo, userId, user, pageNumber, keyword, createSuccess]);



    // export contacts data
    const headersCSV = [
        { label: "ID", key: "id" },
        { label: "Name", key: "name" },
        { label: "Phone", key: "phone" },
        { label: "Email", key: "email" },
        {label: "Group", key: "group.name" }
    ];     
    const csvReport = {
        data: contacts,
        headers: headersCSV,
        filename: 'Contacts.csv'
    };

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
            const contact = {
                name: name,
                phone: phone,
                email: email,
                groupId: groupId
            };
            //console.log(contact);return false;
            dispatch(createContact(contact));
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

    const deleteRow = (id) => {
        dispatch(deleteContact(id));
    }

  

    const renderTable = () => (
        <table className="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th>Share Contacts</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Group</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>                               
                            <Toggle
                                
                            />
                        </td>
                        <td>{contact.name}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.email}</td>
                        <td>{contact.group ? contact.group.name : ''}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <ButtonGoBack history={history} />
            <HeaderContent name={name} />
             
            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                     


                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"></h3>
                                    <div className="card-tools">
                                        <Search
                                            keyword={keyword}
                                            setKeyword={setKeyword}
                                            setPage={setPageNumber}
                                        />
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        loader={<DataTableLoader />}
                                        render={renderTable}
                                    />
                                </div>
                                {/* /.card-body */}
                            </div>

                            <Pagination
                                page={page}
                                pages={pages}
                                setPage={setPageNumber}
                            />
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

export default UserEditScreen;
