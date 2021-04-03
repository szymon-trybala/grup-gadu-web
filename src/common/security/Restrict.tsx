import React from "react";
import { useAppSelector } from "../../core/store/hooks";
import NotLoggedInFeedback from "../feedbacks/NotLoggedInFeedback";

interface RestrictProps {
  children: React.ReactElement;
}

const Restrict: React.FC<RestrictProps> = ({ children }) => {
  const auth = useAppSelector((s) => s.authSlice);

  if (auth.user) return children;

  return <NotLoggedInFeedback />;
};

export default Restrict;
