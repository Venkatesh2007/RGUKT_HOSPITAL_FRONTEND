import React from "react";
import { Spin } from "antd";

const LoadingView = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <Spin size="large" />;
    </div>
  );
};

export default LoadingView;
