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
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
// Billing page components
import Invoice from "layouts/billing/components/Invoice";
import { AccountContext } from "context/authContext";

import { getEachBankAccount } from "requests/requests";

function Invoices() {
  const { account, cookie, access_token, setSelectedBank } = useContext(AccountContext);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {account?.accountAccesses?.map((each) => (
            <MDButton
              onClick={async () => {
                let data = await getEachBankAccount(access_token, cookie, each.accountId);
                setSelectedBank(data.data);
                console.log(data);
              }}
              key={each.id}
            >
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <MDBox lineHeight={1.125}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {each.iban}
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="regular" color="text">
                    {each.id}
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" alignItems="center">
                  <MDTypography variant="button" fontWeight="regular" color="text">
                    {each.currency}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDButton>
          ))}
        </MDBox>
        {/* <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new account
        </MDButton>
        <MDBox mt={3} lineHeight={1} justifyContent="center">
          <MDBox pr={1} mt={2}>
            <MDInput label="Search here" fullWidth />
          </MDBox>
          <MDBox pr={1} mt={2}>
            <MDInput label="Search here" fullWidth />
          </MDBox>
          <MDBox pr={1} mt={2}>
            <MDInput label="Search here" fullWidth />
          </MDBox>
        </MDBox> */}
      </MDBox>
    </Card>
  );
}

export default Invoices;
