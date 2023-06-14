import React, { Suspense } from 'react';
import {
  CNavbarToggler,
  CButton,
  CNavbarText,
  CNavItem,
  CContainer,
  CNavLink,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CForm,
  CCollapse,
} from "@coreui/react";
import navigation from "../../navs/adminNavs";
//import CIcon from '@coreui/icons-react'
import CIcon from '@coreui/icons-react'
import "../../accests/css/adminNavbarStyle.css";
import { cilMenu } from '@coreui/icons';
const defaultProps = {};

const AdminNavbar = (props) => {
  const {name, onVisibleChange} = props;

  return (
    <React.Fragment>
      <CNavbar expand="lg" className="nav" colorScheme="dark">
        <CContainer fluid>
          <CButton className="header-toggler ps-1 sidebar-togler" color="link" onClick={onVisibleChange}>
          <CIcon icon={cilMenu} size="xxl"/>
          </CButton>
          
          <CForm className="d-flex">
            <CNavbarText className="me-2" >{name}</CNavbarText>
            <CButton
              type="submit"
              color="danger"
              variant="outline"
              onClick={(e) => props.onLogout(e)}
            >
              Вийти
            </CButton>
          </CForm>
        </CContainer>
      </CNavbar>
    </React.Fragment>
  );
};

AdminNavbar.defaultProps = defaultProps;

export default AdminNavbar;

