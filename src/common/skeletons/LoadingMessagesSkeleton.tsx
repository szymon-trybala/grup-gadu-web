import { Skeleton, Comment } from "antd";
import React from "react";

const LoadingMessagesSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton loading={true} active avatar>
        <Comment key="loading" author="loading" content="loading" />
      </Skeleton>
      <Skeleton loading={true} active avatar>
        <Comment key="loading" author="loading" content="loading" />
      </Skeleton>
      <Skeleton loading={true} active avatar>
        <Comment key="loading" author="loading" content="loading" />
      </Skeleton>
    </>
  );
};

export default LoadingMessagesSkeleton;
