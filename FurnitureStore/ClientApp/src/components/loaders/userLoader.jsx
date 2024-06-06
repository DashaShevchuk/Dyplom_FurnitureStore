import React from "react";
import { Spin } from "antd";
import "../../accests/css/loaderStyle.css";

const UserLoader = ({ isLoading }) => {
  return (
    <div className="user-spinner-div">
      <Spin spinning={isLoading} size="large" />
    </div>
  );
};

export default UserLoader;
