import React, { useState } from "react";
import { Layout, Menu, ConfigProvider} from "antd";
import navigation from "../../navs/userNavs";
import "../../accests/css/userNavbarStyle.css";
import logo from "../../accests/images/logo.svg";
const { Header, Content, Footer } = Layout;

const UserNavbar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
 
  const handleMenuClick = (e, id, key) => {
    e.preventDefault();
    setSelectedItem(key);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        transitionDelay: "250ms",
      });
    }
  };
  return (
    <Header className="header">
      <div className="logo">
        <img src={logo} className="image"/>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        className="menu"
        selectedKeys={selectedItem ? [selectedItem.toString()] : []}
        onMouseLeave={() => setSelectedItem(null)}
        items={navigation.items.map((item, index) => {
          const key = index + 1;
          return {
            key,
            label: (
              <a
                href={item.url}
                onClick={(e) => handleMenuClick(e, item.url, key)}
                className={`menu-item ${selectedItem === key ? 'selected' : ''}`}
              >
                {item.label}
              </a>
            ),
          };
        })}
        style={{
          flex: 1,
          minWidth: 0
        }}
      />
    </Header>
  );
};
export default UserNavbar;
