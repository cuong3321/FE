import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";



import ContactScreen from "./screens/contact/ContactScreen";
import ContactEditScreen from "./screens/contact/ContactEditScreen";
import ContactShareScreen from "./screens/contact/ContactShareScreen";

import ImportContactScreen from "./screens/import/ImportContactScreen";

import GroupScreen from "./screens/group/GroupScreen";
import GroupEditScreen from "./screens/group/GroupEditScreen";

import UserScreen from "./screens/user/UserScreen";
import UserEditScreen from "./screens/user/UserEditScreen";
import ProfileScreen from "./screens/user/ProfileScreen";


import PrivateRoute from "./auth/PrivateRoute";
import NotFoundScreen from "./screens/NotFoundScreen";
// import AdminRoute from "./auth/AdminRoute";
// import NotAuthorizedScreen from "./screens/NotAuthorizedScreen";

const Main = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <>
            <Header />
            <Menu />

            <div className="content-wrapper">
                <Switch>
                    {/* <PrivateRoute
                        path="/active"
                        exact
                        component={ActiveOrdersScreen}
                    />
                    <PrivateRoute path="/profile" component={ProfileScreen} /> */}
                    {/* <AdminRoute
                        path="/user/:id/edit"
                        component={UserEditScreen}
                    />
                    <AdminRoute path="/user" exact component={UserScreen} /> */}

                    <PrivateRoute
                        path="/contact/:id/edit"
                        component={ContactEditScreen}
                    />
                    <PrivateRoute path="/contact" component={ContactScreen} />
                    <PrivateRoute
                        path="/share/:id"
                        component={ContactShareScreen}
                    />

                    <PrivateRoute
                        path="/import"
                        component={ImportContactScreen}
                    />

                    <PrivateRoute
                        path="/group/:id/edit"
                        component={GroupEditScreen}
                    />
                    <PrivateRoute path="/group" component={GroupScreen} />

                 
                    <PrivateRoute path="/" component={ContactScreen} />
                    <Route component={NotFoundScreen} />
                </Switch>
            </div>
            <Footer />
        </>
    );
};

export default Main;
