import React from "react";
import {
  CContainer,
  CSidebar,
  CSidebarNav,
  CNavItem,
  CSidebarToggler,
  CSidebarBrand,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import logo from "../../accests/images/logo light.svg"
import navigation from "../../navs/adminNavs";
import "../../accests/css/adminSidebarStyle.css";

const AdminSideBar = ({ visible, onVisibleChange }) => {
  return (
    <CSidebar position="fixed" visible={visible} className="sidebar">
      <CSidebarBrand className="logo-place">
         <img src={logo} className="logo"/>
      </CSidebarBrand>
      <CContainer>
        <CSidebarNav>
          {navigation.items.map((item) => (
            <CNavItem key={item.label} href={item.url}>
              <CIcon customClassName="nav-icon" icon={item.icon} />
              {item.label}
            </CNavItem>
          ))}
        </CSidebarNav>
        <CSidebarToggler
          onClick={onVisibleChange}
          className="sidebar-toggler"
        />
      </CContainer>
    </CSidebar>
  );
};

export default AdminSideBar;
