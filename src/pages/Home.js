import React from "react";
import { Row, Col } from "antd";

function Home() {
  return (
      <Row className='logoRow' justify="center" align="middle">
        <Col className="homeLogo" span={24}>
            <img src="/isoLogo.png" alt="logo-home" />
        </Col>
      </Row>
  );
}

export default Home;
