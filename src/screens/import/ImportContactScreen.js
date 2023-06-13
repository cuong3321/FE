import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
import { importContact } from "../../actions/contactActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

const ImportContactScreen = ({ history, match }) => {
    // const [modalIsOpen, setModalIsOpen] = useState(false);

    // const [name, setName] = useState("");

    // const [errors, setErrors] = useState({});
    // const [keyword, setKeyword] = useState("");
    // const [pageNumber, setPageNumber] = useState(1);

    // const dispatch = useDispatch();

    // const categoryList = useSelector((state) => state.categoryList);
    // const { loading, error, categories, page, pages } = categoryList;

    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;

    // const categoryCreate = useSelector((state) => state.categoryCreate);
    // const {
    //     loading: createLoading,
    //     success: createSuccess,
    //     error: createError,
    // } = categoryCreate;

    // useEffect(() => {
    //     dispatch(listCategories(keyword, pageNumber));

    //     if (createSuccess) {
    //         setName("");
    //         setModalIsOpen(false);
    //     }
    // }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);
    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
       
        const displayRecords = [];
        for (let i = 0; i < csvRows.length; i++) {
            const newRow = csvRows[i].split(',');
            const aRow = {
                name: newRow[0].replaceAll('"',''),
                phone: newRow[1].replaceAll('"',''),
                email: newRow[2].replaceAll('"','')
            }
            displayRecords.push(aRow);
        }
        setArray(displayRecords);
        return displayRecords;
    };

    const submitHandler = (e) => {
        e.preventDefault();
         if (file) {
            fileReader.onload = function (event) {
                 
                const text = event.target.result;
                const array = csvFileToArray(text);
                dispatch(importContact(array));
            };
            fileReader.readAsText(file);
        }
    };

    return (
        <>
            <HeaderContent name={"Contacts"} />
            <div style={{ textAlign: "center" }}>
                <form onSubmit={submitHandler}>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <input type={"file"} accept={".csv"} onChange={handleOnChange} />
                                            <button type="submit" className="btn btn-primary btn-lg">IMPORT CSV</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </>
    );

};

export default ImportContactScreen;
