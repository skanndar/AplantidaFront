import React from "react";
import { Row, Col } from "antd";

function Home() {
  return (
    <div >
      <Row justify="center" align="middle">
        <Col className="homeLogo" span={24}>
            <img src="/isoLogo.png" alt="logo-home" />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
