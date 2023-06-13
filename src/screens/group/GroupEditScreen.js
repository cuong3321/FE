import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Components */
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import ButtonGoBack from "../../components/ButtonGoBack";

/* Constants */
import {
    GROUP_UPDATE_RESET,
    GROUP_DETAILS_RESET,
    GROUP_DELETE_RESET,
} from "../../constants/groupConstants";

/* Actions */
import {
    updateGroup,
    listGroupDetails,
} from "../../actions/groupActions";
import LoaderHandler from "../../components/loader/LoaderHandler";

const GroupEditScreen = ({ history, match }) => {
    const groupId = parseInt(match.params.id);

    const [name, setName] = useState("");

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //group details state
    const groupDetails = useSelector((state) => state.groupDetails);
    const { loading, error, group } = groupDetails;

    //group update state
    const groupUpdate = useSelector((state) => state.groupUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = groupUpdate;

    useEffect(() => {
        //after update redirect to users
        if (successUpdate) {
            dispatch({ type: GROUP_UPDATE_RESET });
            dispatch({ type: GROUP_DETAILS_RESET });
            dispatch({ type: GROUP_DELETE_RESET });
            history.push("/group");
        }

        //load product data
        if (group) {
            if (!group.name || group.id !== groupId) {
                dispatch(listGroupDetails(groupId));
            } else {
                //set states
                setName(group.name);
            }
        }
    }, [dispatch, history, groupId, group, successUpdate]);

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
                updateGroup({
                    id: groupId,
                    name,
                })
            );
        }
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
            <hr />
            <button type="submit" className="btn btn-success">
                Submit
            </button>
        </form>
    );

    return (
        <>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Groups"} />
            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    <ButtonGoBack history={history} />
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Edit Group
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

export default GroupEditScreen;
