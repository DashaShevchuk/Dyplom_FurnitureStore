import React, { useState } from "react";
import {
  CIcon,
  CNavItem,
  CContainer,
  CNavLink,
  CNavbar,
  CNavbarBrand,
  CNavbarToggler,
  CNavbarNav,
  CForm,
  CCollapse,
} from "@coreui/react";
import navigation from "../../navs/userNavs";
import "../../accests/css/userNavbarStyle.css";

const UserNavbar = () => {
  const [visible, setVisible] = useState(false);
  const isNavbarExpanded = visible ? 'expanded' : 'collapsed';
  const handleMenuClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setVisible(false);
  };
  return (
    <React.Fragment>
      <CNavbar expand="sm" className="nav" colorScheme="dark" >
        <CContainer fluid>
          <CNavbarBrand href="#" className="mx-auto">
            {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
           MSpace
          </CNavbarBrand>
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CForm>
          <CCollapse className="navbar-collapse" visible={visible}>
              <CNavbarNav className="d-none d-md-flex me-auto">
                {navigation.items.map((item) => {
                  return (
                    <CNavItem key={item.label}>
                      <CNavLink href={item.url} onClick={(e) => handleMenuClick(e, item.url)}>{item.label}</CNavLink>
                    </CNavItem>
                  );
                })}
              </CNavbarNav>
          </CCollapse>
          </CForm>
        </CContainer>
      </CNavbar>
    </React.Fragment>
  );
};
export default UserNavbar;
