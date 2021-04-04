import { Skeleton } from "antd";
import React from "react";

const LoadingChatSkeleton: React.FC = () => {
  return <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />;
};

export default LoadingChatSkeleton;
