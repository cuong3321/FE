import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "../../components/Select";
import SelectFilter from "../../components/SelectFilter";
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
/* Styles */
import { modalStyles } from "../../utils/styles";
Modal.setAppElement("#root");
const ContactScreen = ({ history, match }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [groupId, setGroupId] = useState(null);

    const [errors, setErrors] = useState({});
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const [filterGroup, setFilterGroup] = useState("");

    const groupList = useSelector((state) => state.groupList);
    const { groups } = groupList;

    const dispatch = useDispatch();

    const contactList = useSelector((state) => state.contactList);
    const { loading, error, contacts, page, pages } = contactList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const contactCreate = useSelector((state) => state.contactCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = contactCreate;

    useEffect(() => {
        dispatch(listContacts(keyword, pageNumber, filterGroup));

        if (createSuccess) {
            setName("");
            setPhone("");
            setEmail("");
            setGroupId(null)
            setModalIsOpen(false);
        }

        

    }, [dispatch, history, userInfo, pageNumber, keyword,filterGroup, createSuccess]);



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

    const AnsweringMachineCsvHeader = [
        {
            id: 'name',
            title: 'name'
        },
        {
            id: 'phone',
            title: 'phone'
        },
        {
            id: 'email',
            title: 'email'
        },
    ];
    
    const exportCSV = () => {
        exportProcess('answer_phone_report.csv', AnsweringMachineCsvHeader, contacts)
    };

    const exportProcess = (filename='export.csv',headers,  rows) => {
        const headersRow = headers.reduce((result, {id, title})=>{
            return {
                ...result,
                [id]:title
            }
        }, {})
        var processRow = function (row:any) {
            var finalVal = '';
            headers.forEach(({id}, index)=>{
                let innerValue = row[id] == undefined ? '' : row[id].toString();
                if (row[id] instanceof Date) {
                    innerValue = row[id].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (index > 0)
                    finalVal += ',';
                finalVal += result;
            })
            
            return finalVal + '\n';
        };
    
        var csvFile = '';
        csvFile += processRow(headersRow)
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }
    
        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

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

    const renderModalCreateContact = () => (
        <>
            <ModalButton
                modal={modalIsOpen}
                setModal={setModalIsOpen}
                classes={"btn btn-success btn-lg btn-mdf"}
            />
            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <h2>Create Contact</h2>
                <LoaderHandler loading={createLoading} error={createError} />
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
                    
                    <hr />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>

                    <ModalButton
                        modal={modalIsOpen}
                        setModal={setModalIsOpen}
                        classes={"btn-danger float-right"}
                    />
                </form>
            </Modal>
        </>
    );

    const renderTable = () => (
        <table className="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Group</th>
                    <th className="d-none d-sm-table-cell">Created At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.email}</td>
                        <td>{contact.group ? contact.group.name : ''}</td>
                        <td className="d-none d-sm-table-cell">
                            {contact.createdAt.slice(0, 10)}
                        </td>





                        <td> 
                            {/* <Link
                                to={`/contact/${contact.id}/share`}
                                className="btn btn-success btn-lg btn-mdf"
                            >
                                Share
                            </Link> */}
                            {contact.userContact[0].mode == 'viewr' ? (
                                ""
                            ) : (
                                <Link
                                    to={`/share/${contact.id}`}
                                    className="btn btn-primary btn-lg btn-mdf"
                                >
                                    Share
                                </Link>
                            )}

                            {contact.userContact[0].mode == 'viewr' ? (
                                ""
                            ) : (
                                <Link
                                to={`/contact/${contact.id}/edit`}
                                    className="btn btn-success btn-lg btn-mdf"
                                >
                                    Edit
                                </Link>
                            )}

                            {contact.userContact[0].mode == 'viewr' ? (
                                ""
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-danger btn-lg btn-mdf"
                                    onClick={(e) => {
                                        deleteRow(`${contact.id}`)
                                    }}
                                >
                                    Delete
                                </button>
                            )}

                            
                        </td>
                        <td>
                              
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <HeaderContent name={"Contacts"} />

            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                     

                    <div className="row justify-content-end">
                        <div className="col-4">
                            {renderModalCreateContact()}
                            <Link
                                to='/import'
                                className="btn btn-primary btn-lg btn-mdf"
                            >
                                Import
                            </Link>

                             {/* <CSVLink {...csvReport} className="btn btn-primary btn-lg btn-mdf">Export</CSVLink> */}
                             {/* <CSVLink data={contacts} headers={headersCSV} filename="contacts.csv" className="btn btn-primary btn-lg btn-mdf">Export</CSVLink> */}
                             <button
                                    type="button"
                                    className="btn btn-primary btn-lg btn-mdf"
                                    onClick={exportCSV}
                                >
                                    Export
                            </button>
                        </div>
                    </div>

                    <br />


                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">SEARCH</h3>
                                    <div className="card-tools">
                                        <Search
                                            keyword={keyword}
                                            setKeyword={setKeyword}
                                            setPage={setPageNumber}
                                        />
                                    </div>
                                </div>
                                <div className="card-header">
                                    <h3 className="card-title">FILTER BY GROUP</h3>
                                     
                                    <div className="card-tools selectFilter">
                                        <SelectFilter
                                            filterGroup={filterGroup}
                                            setFilterGroup={setFilterGroup}
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

export default ContactScreen;
