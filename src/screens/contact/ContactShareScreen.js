import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import Modal from "react-modal";
import Checkbox from "../../components/form/Checkbox";
import DataTableLoader from "../../components/loader/DataTableLoader";
import ButtonGoBack from "../../components/ButtonGoBack";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Toggle from "../../components/ToggleButton";

/* Actions */
import { listUsers, register } from "../../actions/userActions";
import {
    listContactDetails,
} from "../../actions/contactActions";
/* Styles */
import { modalStyles } from "../../utils/styles";

const ContactShareScreen = ({ history, match }) => {
    const contactId = parseInt(match.params.id);
    const params = useParams();
     

    const [contactName, setContactName] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users, page, pages } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userRegister = useSelector((state) => state.userRegister);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = userRegister;

 

    useEffect(() => {  
        if (userInfo) {
            dispatch(listUsers(keyword, pageNumber));
        }
   
        if (createSuccess) {
            setName("");
            setPassword("");
            setEmail("");
            setIsAdmin(false);

            setModalIsOpen(false);
        }
    }, [dispatch, userInfo, pageNumber, keyword, history, createSuccess]);

    const logState = state => {
        //console.log("Toggled:", state)
    }
    const getIsSharedContact = (userContact, userId) => {
         
        const contact = userContact.filter(item => {
            return item.contactId == contactId;
        })
         
        return contact.length > 0 ? true : false;
    }


    const renderTable = () => (
        <table className="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th className="d-none d-sm-table-cell">ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="d-none d-sm-table-cell">
                            <Toggle
                                userId={user.id}
                                contactId={contactId}
                                toggled={getIsSharedContact(user.usercontact, user.id)}
                                onClick={logState}
                            />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            {/* Content Header (Page header) */}
            <HeaderContent name={contactId} />
            {/* Main content */}
             
            <section className="content">
                <div className="container-fluid">
                    {/* {renderModalCreateUser()} */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Share Contacts</h3>
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
                        <ButtonGoBack history={history} />
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>
        </>
    );
};

export default ContactShareScreen;
