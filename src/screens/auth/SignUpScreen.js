import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [cfpassword, setCfPassword] = useState("");
    const dispatch = useDispatch();
    //const [errors, setErrors] = useState({});
    //get user from state
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, error, loading } = userLogin;

    useEffect(() => {
        //if user is logged
        if (userInfo) {
            history.push("/contact");
        }
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        // //dispatch(login(email, password));


        // let errorsCheck = {};
        // if (!name) {
        //     errorsCheck.name = "Name is required";
        //     //alert('Name is required');
        //     //return false;
        // }
        // if (!password) {
        //     errorsCheck.password = "Password is required";
        //     //alert('Password is required');
        //     //return false;
        // }

        // if (!email) {
        //     errorsCheck.email = "Email is required";
        //     //alert('Email is required');
        //     //return false;
        // }
        // if (password !== cfpassword) {
        //     errorsCheck.cfpassword = "confirm password not match";
        //     //alert('confirm password not match');
        //     //return false;
        // }

        // if (Object.keys(errorsCheck).length > 0) {
        //     setErrors(errorsCheck);
        // } else {
        //     setErrors({});
        // }
        // //console.log(name)
        // //return false;
        // if (Object.keys(errorsCheck).length === 0) {
         
        const user = {
            name: name,
            email: email,
            password: password,
            cfpassword: cfpassword,
            isAdmin: 1,
        };
        //     // console.log(user); return false;
        //     dispatch(signup(user));
        // }

        dispatch(signup(user));
    };

    const backtologin = (e) => {
        history.push('/login')
    }

    return (
        <div
            className="row justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#cad5df" }}
        >
            <div className="login-box">
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-header ">
                        <div className="login-logo">
                            <b>DEMO</b>
                            <div className="text-center">
                                <img
                                    className="profile-user-img img-fluid img-circle"
                                    src={"/logo.png"}
                                    alt="User profile picture"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">
                            Sign up User
                        </p>
                        {loading && <Loader variable={loading} />}
                        {error && <Message message={error} color={"danger"} />}
                        <form onSubmit={submitHandler}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={cfpassword}
                                    onChange={(e) =>
                                        setCfPassword(e.target.value)
                                    }
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-end">
                                <div className="col-4">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-block"
                                        onClick={(e) => {
                                            backtologin()
                                        }}
                                    >
                                        Back
                                    </button>
                                </div>
                                <div className="col-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <br />
                        </form>
                        <div></div>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
