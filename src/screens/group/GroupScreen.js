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
import { createGroup, listGroups, deleteGroup } from "../../actions/groupActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

const GroupScreen = ({ history, match }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [name, setName] = useState("");

    const [errors, setErrors] = useState({});
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();

    const groupList = useSelector((state) => state.groupList);
    const { loading, error, groups, page, pages } = groupList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const groupCreate = useSelector((state) => state.groupCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = groupCreate;

    useEffect(() => {
        dispatch(listGroups(keyword, pageNumber));

        if (createSuccess) {
            setName("");
            setModalIsOpen(false);
        }
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);

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
            const group = {
                name: name,
            };

            dispatch(createGroup(group));
        }
    };

    const deleteRow = (id) => {
        dispatch(deleteGroup(id));
    }

    const renderModalCreateGroup = () => (
        <>
            <ModalButton
                modal={modalIsOpen}
                setModal={setModalIsOpen}
                classes={"btn-success btn-lg mb-2"}
            />
            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <h2>Create Group</h2>
                <LoaderHandler loading={createLoading} error={createError} />
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"name"}
                        type={"text"}
                        data={name}
                        setData={setName}
                        errors={errors}
                    />

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
                    <th className="d-none d-sm-table-cell">Created At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {groups.map((group) => (
                    <tr key={group.id}>
                        <td>{group.id}</td>
                        <td>{group.name}</td>
                        <td className="d-none d-sm-table-cell">
                            {group.createdAt.slice(0, 10)}
                        </td>
                        <td>
                            <Link
                                to={`/group/${group.id}/edit`}
                                className="btn btn-success btn-lg"
                            >
                                Edit
                            </Link>

                            <button
                                type="button"
                                className="btn btn-danger btn-lg btn-mdf"
                                onClick={(e) => {
                                    deleteRow(`${group.id}`)
                                }}
                            >
                                Delete
                            </button>
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
            <HeaderContent name={"Groups"} />

            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    {renderModalCreateGroup()}

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Groups</h3>
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

export default GroupScreen;
