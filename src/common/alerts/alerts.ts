import { notification } from "antd";

const error = (message: string) => {
  notification.error({
    placement: "bottomLeft",
    message,
  });
};

const success = (message: string) => {
  notification.success({
    placement: "bottomLeft",
    message,
  });
};

export const alert = {
  error,
  success,
};
