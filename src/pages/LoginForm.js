import React from "react";
import { withAuth } from "../lib/Auth";

import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = (props) => {
  const onFinish = (values) => {
    const { email, password } = values;
    props.login(email, password);
    console.log("Received values of form: ", values);
  };

  return (
    <Row className="loginRow" justify="center" align="middle">
      <Col className="homeLogo">
        <img src="/isoLogo.png" alt="logo-home" />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            ref={(input) => input && input.focus()}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              ref={(input) => input && input.focus()}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="#">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default withAuth(LoginForm);
