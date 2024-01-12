import React, { useState } from "react";
export const AccountContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({ branch: "", id: "", login: "", email: "" });
  const [cookie, setCookie] = useState("");
  const [access_token, setAccessToken] = useState("");
  const [bankAccounts, setBankAccountsList] = useState([]);
  const [selectedBank, setSelectedBank] = useState({});

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        cookie,
        setCookie,
        access_token,
        setAccessToken,
        bankAccounts,
        setBankAccountsList,
        selectedBank,
        setSelectedBank,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
