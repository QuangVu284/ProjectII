import { createContext, useState } from "react";
import "./context.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(false);

  const showToastMessage = (feat, content) => {
    toast[feat](`${content}`, {
      position: "top-right",
      className: "toast-message",
      autoClose: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ showToastMessage, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
