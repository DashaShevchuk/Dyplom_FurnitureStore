import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as icon from '@coreui/icons';
import {
  CContainer,
  CSidebar,
  CSidebarNav,
  CNavItem,
  CSidebarToggler,
  CSidebarBrand,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import navigation from "../../navs/adminNavs";
import "../../accests/css/userCategoriesSidebarStyle.css";
// import kitchen from "../../accests/images/categories/kitchen.ico";

const CategoriesSideBar = ({ categories }) => {
  console.log(categories);
  const [unfoldable, setUnfoldable] = useState(true);
  const onUnfoldableChange = () => {
    setUnfoldable(!unfoldable);
  };

    const items = [
      {
        label:"Кухня",
        icon:icon.cilCoffee
      },
      {
        label:"Дитяча",
        icon:icon.cilChild
      },   
      {
        label:"Передпокій",
        icon:icon.cilRoom
      },
      {
        label:"Вітальня",
        icon:icon.cilSofa
      },
      {
        label:"Спальня",
        icon:icon.cilBed
      },
      {
        label:"Гардероб",
        icon:icon.cilBeachAccess
      },
      {
        label:"Офісні меблі",
        icon:icon.cilDevices
      },
    ]
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      className="sidebar"
      onMouseOver={() => {
        onUnfoldableChange();
      }}
      onMouseOut={() => {
        onUnfoldableChange();
      }}
      // onClick={() => {
      //   onUnfoldableChange();
      // }}
    >
      <CContainer>
      <CSidebarNav>
          {items.map((item) => (
            <CNavItem key={item.label} href={`/projects/${item.label}`} className="item">
              <CIcon customClassName="nav-icon" icon={item.icon} />
              {item.label}
            </CNavItem>
          ))}
        </CSidebarNav>
        {/* <CSidebarToggler
         
        /> */}
      </CContainer>
    </CSidebar>
  );
};

export default CategoriesSideBar;
