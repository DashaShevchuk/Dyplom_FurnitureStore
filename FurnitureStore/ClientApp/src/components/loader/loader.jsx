import React from "react";
import { Spin } from "antd";
import "../../accests/css/loaderStyle.css";

const Loader = ({ isLoading }) => {
  return (
    <div className="spinner-div">
      <Spin spinning={isLoading} size="large" className="spinner"/>
    </div>
  );
};

export default Loader;
