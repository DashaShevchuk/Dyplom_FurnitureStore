import React, { useState } from "react";
import {
  CNavItem,
  CContainer,
  CNavLink,
  CNavbar,
  CNavbarBrand,
  CNavbarToggler,
  CNavbarNav,
  CForm,
  CCollapse,
  CButton,
  CFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cibInstagram,
    cibTelegramPlane,
    cibViber,
    cilPhone
  } from "@coreui/icons";
import "../../accests/css/userFooterStyle.css";

const UserFooter = () => {
  const openTelegram = () => {
    window.open("https://t.me/+380 68 763 93 61", "_blank");
  };

  const openViber = () => {
    window.open("viber://chat?number=+380 68 763 93 61", "_blank");
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com/furniture_mspace", "_blank");
  };
  return (
    <React.Fragment>
      <CFooter className="footer-main">
        <div>
          <span>&copy; 2022-2023 MSpace Усі права захищенні</span>
        </div>
        <div className="d-flex flex-row">
        <CButton className="media-button" color="link" onClick={openTelegram}>
            <CIcon icon={cibTelegramPlane} />
          </CButton>
          <CButton className="media-button" color="link" onClick={openViber}>
            <CIcon icon={cibViber} />
          </CButton>
          <CButton className="media-button" color="link" onClick={openInstagram}>
            <CIcon icon={cibInstagram} />
          </CButton>
        </div>
        <div className="d-flex flex-column">
            Меблі на замовлення у Рівному та Рівненській області
            <span>
            <CIcon icon={cilPhone} />
            +380 68 763 93 61
            </span>
        </div>
      </CFooter>
    </React.Fragment>
  );
};
export default UserFooter;
