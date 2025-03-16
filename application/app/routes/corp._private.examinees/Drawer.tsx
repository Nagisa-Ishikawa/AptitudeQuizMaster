import { Drawer as MantineDrawer } from "@mantine/core";
import React from "react";
type Props = {
  opend: boolean;
  close: () => void;
};

export const Drawer: React.FC<Props> = ({ opend, close }) => {
  return (
    <MantineDrawer
      opened={opend}
      onClose={close}
      position="bottom"
      withCloseButton={false}
    >
      {/* ドロワーの中身を書く */}
    </MantineDrawer>
  );
};
