import React from "react";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";
// import Footer from "../component/Footer";

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />
      <Sidebar />
      <div className="main-content">{children}</div>
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;
