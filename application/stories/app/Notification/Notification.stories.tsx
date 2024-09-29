import { Notification } from "../../../app/components/Notification";

export default {
  title: "App/Notification/Notification",
  component: Notification,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    title: "エラー概要",
    children: "エラー詳細あれば",
    mode: "error",
    onClose: () => {},
  },
};
