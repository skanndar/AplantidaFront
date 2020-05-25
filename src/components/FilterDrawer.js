import React, { useState } from "react";
import { Drawer, Button, Affix } from "antd";

const FilterDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(110);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Affix offsetTop={top}>
        <Button type="primary" onClick={showDrawer}>
          Filter
        </Button>
      </Affix>
      <Drawer
        title="Filters"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        width="320"
        keyboard
        footer={"Powered by ALIADOS"}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
