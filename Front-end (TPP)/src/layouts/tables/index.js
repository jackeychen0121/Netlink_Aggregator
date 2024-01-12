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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import { getAllTPP, modify_allowance } from "requests/requests";
import { useEffect, useContext, useState } from "react";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  const [columns, setColumns] = useState([
    { Header: "name", accessor: "name", width: "45%", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "role", accessor: "role", align: "left" },
    { Header: "allowed", accessor: "allowed", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]);
  const [rows, setRows] = useState([]);
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const refreshTable = async () => {
    const mainData = await getAllTPP();
    console.log(mainData);
    const tempData = mainData.get_all_tpp.map((each) => {
      return {
        name: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            {each.name}
          </MDTypography>
        ),
        email: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            {each.email}
          </MDTypography>
        ),
        role: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            {each.role}
          </MDTypography>
        ),
        allowed: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={each.allowed ? "Allowed" : "Disabled"}
              color={each.allowed ? "success" : "dark"}
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        action: (
          <>
            {" "}
            {each.role == "admin" ? (
              <></>
            ) : (
              <MDButton
                variant="gradient"
                color={each.allowed ? "success" : "primary"}
                sx={{ width: "20%" }}
                onClick={async () => {
                  await modify_allowance(each);
                  refreshTable();
                }}
              >
                {each.allowed ? "Allowed" : "Disabled"}
              </MDButton>
            )}
          </>
        ),
      };
    });
    setRows(tempData);
  };
  useEffect(async () => {
    refreshTable();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  TPP Management
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
