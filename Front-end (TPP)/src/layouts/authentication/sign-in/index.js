import { useState } from "react";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useNavigate } from "react-router-dom";
import { login } from "requests/requests";

function Basic() {
  const toastId = "notify-login";
  const navigate = useNavigate();
  // const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const submit_login = async () => {
    await login(email, password);
    // setToken(data.token);
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
    navigate("/dashboard");
  };

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

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
                label="Name"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="password"
                fullWidth
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => {
                  submit_login();
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
