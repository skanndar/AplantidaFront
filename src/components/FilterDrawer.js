import React, { useState } from "react";
import { Drawer, Button } from "antd";

const FilterDrawer = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Filter
      </Button>
      <Drawer
        title="Filters"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        width="320"
        keyboard
        footer={'Powered by ALIADOS'}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
