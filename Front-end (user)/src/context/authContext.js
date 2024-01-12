import React, { useState } from "react";
export const AccountContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({ id: "", name: "", email: "", role: "" });
  // const [allowed, setAllowed] = useState(false);
  const [token, setToken] = useState("");

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        // allowed,
        // setAllowed,
        token,
        setToken,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
