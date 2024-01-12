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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import masterCardLogo from "assets/images/logos/mastercard.png";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import pattern from "assets/images/illustrations/pattern-tree.svg";
import { useEffect, useContext } from "react";
import { AccountContext } from "context/authContext";

function MasterCard({ color }) {
  const { selectedBank } = useContext(AccountContext);

  return (
    <Card
      sx={({ palette: { gradients }, functions: { linearGradient }, boxShadows: { xl } }) => ({
        background: gradients[color]
          ? linearGradient(gradients[color].main, gradients[color].state)
          : linearGradient(gradients.dark.main, gradients.dark.state),
        boxShadow: xl,
        position: "relative",
      })}
    >
      <MDBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.2}
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <MDBox position="relative" zIndex={2} p={2}>
        <MDBox color="white" p={1} lineHeight={0} display="inline-block">
          Type : {selectedBank?.details?.accountType}
        </MDBox>
        <MDTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 3, mb: 5, pb: 1 }}>
          <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
            IBAN :
          </MDTypography>{" "}
          {selectedBank?.details?.iban}
        </MDTypography>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox display="flex" alignItems="center">
            <MDBox mr={3} lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Amount
              </MDTypography>
              <MDTypography
                variant="h6"
                color="white"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {selectedBank?.details?.balances[0]?.amount.amount}
              </MDTypography>
            </MDBox>
            <MDBox lineHeight={1} mr={3}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Currency
              </MDTypography>
              <MDTypography variant="h6" color="white" fontWeight="medium">
                {selectedBank?.details?.currency}
              </MDTypography>
            </MDBox>
            <MDBox lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Account Status
              </MDTypography>
              <MDTypography variant="h6" color="white" fontWeight="medium">
                {selectedBank?.details?.accountStatus}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="20%">
            <MDBox component="img" src={masterCardLogo} alt="master card" width="60%" mt={1} />
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of MasterCard
MasterCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the MasterCard
MasterCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
};

export default MasterCard;
