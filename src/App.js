import React, { Component } from "react";
import "./App.less";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Private from "./pages/Private";
import RegistrationForm from "./pages/RegistrationForm";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { Link } from "react-router-dom";

import { Layout, Menu, Breadcrumb, Row, Col } from "antd";
import { HomeOutlined, SyncOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    const { user, logout, isLoggedIn } = this.props;
    return (
      <>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <Link to={"/"}>
              <img src="/logo.png" className="logo" alt="logo" />
            </Link>
            <Menu
              className="menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
            >
              <Menu.Item key="1">
                <Link to={"/"}>
                  <HomeOutlined />
                </Link>
              </Menu.Item>
              {isLoggedIn ? (
                <>
                  <Menu.Item key="2">
                    <Link to={"/plants"}>
                      <SyncOutlined spin />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to={"/private"}>
                      <UserOutlined />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                      <LogoutOutlined onClick={logout} />
                  </Menu.Item>
                </>
              ) : (
                <>
                <Menu.Item key="2">
                    <Link to={"/login"}>
                      <UserOutlined />
                    </Link>
                  </Menu.Item>
                  
                </>
              )}
            </Menu>
          </Header>
          <Content
            className="site-layout"
            style={{ padding: "0 10px", marginTop: 64 }}
          >
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
            <div
              className="site-layout-background"
              style={{ padding: 14, minHeight: "80vh" }}
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute
                  exact
                  path="/signup"
                  component={RegistrationForm}
                />
                <PublicRoute exact path="/login" component={LoginForm} />
                <PrivateRoute exact path="/private" component={Private} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            APLANTIDA ©2020 <br /> Created by ALIADOS
          </Footer>
        </Layout>
      </>
    );
  }
}

export default App;
