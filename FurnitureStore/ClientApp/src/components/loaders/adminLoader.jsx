import React from "react";
import { Spin } from "antd";
import "../../accests/css/loaderStyle.css";

const AdminLoader = ({ isLoading }) => {
  return (
    <div className="admin-spinner-div">
      <Spin spinning={isLoading} size="large" />
    </div>
  );
};

export default AdminLoader;
