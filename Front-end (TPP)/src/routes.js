import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";

// @mui icons
import Icon from "@mui/material/Icon";
const getCurrentUser = () => {
  const userStr = localStorage.getItem("OBAgg");
  if (userStr) return JSON.parse(userStr);

  return null;
};
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, adminPermission }) => {
  const account = getCurrentUser();
  const navigate = useNavigate();
  var showAble = true;
  useEffect(() => {
    if (!account || account.id === "") {
      showAble = false;
      navigate("/authentication/sign-in");
    }
    if (adminPermission && account.role != "admin") {
      showAble = false;
      // setAlert({ message: "Aceess Permission denied", successful: false, open: true });
      navigate("/authentication/sign-in");
    }
  }, [account, navigate]);

  return showAble ? <>{children}</> : null;
};
const NavigateAdmain = () => {
  const account = getCurrentUser();

  return account ? account.role == "admin" ? <Tables></Tables> : <Dashboard></Dashboard> : null;
};
let routes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <NavigateAdmain />,
  },
];

export default routes;
