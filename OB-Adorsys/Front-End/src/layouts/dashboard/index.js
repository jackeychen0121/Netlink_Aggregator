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
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
// Data
import DataTable from "examples/Tables/DataTable";

import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import MasterCard from "examples/Cards/MasterCard";
import { useEffect, useContext, useState } from "react";
import { AccountContext } from "context/authContext";

import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import Invoices from "layouts/billing/components/Invoices";

import { deleteTransaction, deposit } from "requests/requests";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { bankAccounts, account, selectedBank, setSelectedBank, cookie, access_token } =
    useContext(AccountContext);
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [hideBar, setHidebar] = useState("none");
  const [depositAmount, setDepositAmount] = useState(0);

  const submit = async () => {
    if (hideBar == "delete") {
      if (selectedBank.details.id) {
        const data = await deleteTransaction(access_token, cookie, selectedBank?.details?.id);
        let temp = selectedBank;
        temp.details.balances[0].amount.amount = 0;
        setSelectedBank(temp);
      }
      setHidebar("none");
    } else if (hideBar == "deposit") {
      if (selectedBank.details.id) {
        const data = await deposit(
          access_token,
          cookie,
          selectedBank?.details?.id,
          depositAmount,
          selectedBank?.details?.currency
        );
        let temp = selectedBank;
        temp.details.balances[0].amount.amount =
          Number(temp.details.balances[0].amount.amount) + Number(depositAmount);
        setSelectedBank(temp);
      }
      setHidebar("none");
    }
  };

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Branch"
                count={account.branch || "Please log in"}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Email"
                count={account.email || "Please log in"}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="ID"
                count={account.id || "Please log in"}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Login"
                count={account.login || "Please log in"}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
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
                    Bank Accounts
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <Invoices />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={6}>
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
                    Bank Account Info
                  </MDTypography>
                </MDBox>
                <MDBox p={3}>
                  <MasterCard />
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <MDButton
                      variant="gradient"
                      color="success"
                      onClick={() => {
                        setHidebar("deposit");
                      }}
                    >
                      Deposit Cash
                    </MDButton>
                    <MDButton
                      variant="gradient"
                      color="primary"
                      onClick={() => {
                        setHidebar("delete");
                      }}
                    >
                      Delete transaction
                    </MDButton>
                  </MDBox>
                  {hideBar === "none" ? (
                    <></>
                  ) : (
                    <MDBox
                      pr={1}
                      mt={2}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {hideBar === "delete" ? (
                        "Will you delete transactions surely?"
                      ) : (
                        <MDInput
                          label="amount"
                          sx={{ width: "50%" }}
                          type="number"
                          value={depositAmount}
                          onChange={(e) => {
                            setDepositAmount(e.target.value);
                          }}
                        />
                      )}
                      <MDButton
                        variant="gradient"
                        color="primary"
                        sx={{ width: "20%" }}
                        onClick={() => {
                          setHidebar("none");
                        }}
                      >
                        Cancel
                      </MDButton>
                      <MDButton
                        variant="gradient"
                        color="success"
                        sx={{ width: "20%" }}
                        onClick={() => {
                          submit();
                        }}
                      >
                        {hideBar === "delete" ? "Delete" : "Deposit"}
                      </MDButton>
                    </MDBox>
                  )}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
