import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Menu = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            redirectTo();
        }
    }, [dispatch, userInfo]);

    const redirectTo = () => {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { referrer: "/" },
                }}
            />
        );
    };

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            {/* <Link to={"/dashboard"} className="brand-link">
                <img
                    src="/logo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8" }}
                />
                <span className="brand-text font-weight-light">DEMO</span>
            </Link> */}
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={userInfo ? userInfo.image : "/avatar.png"}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {userInfo ? userInfo.name : ""}
                        </Link>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        

                       
                                <li className="nav-header"></li>
                                <li className="nav-item">
                                    {/* <Link to="/user" className="nav-link">
                                        <i className="nav-icon fas fa-user" />{" "}
                                        <p> Users</p>
                                    </Link> */}
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link">
                                        <i className="nav-icon fas fa-user" />{" "}
                                        <p> Contacts</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/group" className="nav-link">
                                        <i className="nav-icon fas fa-users" />{" "}
                                        <p> Groups</p>
                                    </Link>
                                </li>
                         

                        
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
};

export default Menu;
