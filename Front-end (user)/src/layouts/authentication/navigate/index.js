import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
import PageLayout from "examples/LayoutContainers/PageLayout";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Basic() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("OBAgg4user");
    setToken(JSON.parse(accessToken).token);
  }, []);

  return (
    <PageLayout>
      <DashboardNavbar />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid xs={5} sm={4} md={3} lg={2} ml={1.5}>
            <Card>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDTypography variant="h1" fontWeight="medium" textAlign="center" mt={1}>
                    Adorsys
                  </MDTypography>
                  <MDBox mt={4} mb={1}>
                    <Link
                      href={"http://localhost:3002/authentication/sign-in?token=" + token}
                      target="_blank"
                    >
                      <MDButton variant="gradient" color="info" fullWidth>
                        access
                      </MDButton>
                    </Link>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          <Grid xs={5} sm={4} md={3} lg={2} ml={1.5}>
            <Card>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDTypography variant="h1" fontWeight="medium" textAlign="center" mt={1}>
                    Netlink
                  </MDTypography>
                  <MDBox mt={4} mb={1}>
                    <Link href={"http://localhost:3004/?token=" + token} target="_blank">
                      <MDButton variant="gradient" color="info" fullWidth>
                        access
                      </MDButton>
                    </Link>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          <Grid xs={5} sm={4} md={3} lg={2} ml={1.5}>
            <Card>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDTypography variant="h1" fontWeight="medium" textAlign="center" mt={1}>
                    Tink
                  </MDTypography>
                  <MDBox mt={4} mb={1}>
                    <Link href={"http://localhost:3000?token=" + token} target="_blank">
                      <MDButton variant="gradient" color="info" fullWidth>
                        access
                      </MDButton>
                    </Link>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

export default Basic;
