/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useContext } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { AccountContext } from "context/authContext";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useNavigate, useLocation } from "react-router-dom";
import { loginBank } from "requests/requests";
import { Slide, ToastContainer, toast } from "react-toastify";

function Basic() {
  const toastId = "notify-login";
  const { account, setAccount, setCookie, setAccessToken } = useContext(AccountContext);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [id, setID] = useState("");
  const [pin, setPin] = useState("");

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  localStorage.setItem("OBAgg4user", queryParams.get("token"));

  const login = async () => {
    const data = await loginBank(id, pin);

    if (data.data) {
      toast.success("Successful Signin", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, //3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide,
      });
      setAccount(data.data.accountInfo);
      setCookie(data.data.cookie);
      setAccessToken(data.data.access_token);

      navigate("/dashboard");
    } else {
      toast.error("Error Signin", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, //3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide,
      });
    }
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="ID"
                fullWidth
                value={id}
                onChange={(e) => {
                  setID(e.target.value);
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="PIN"
                fullWidth
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => {
                  login();
                }}
              >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
