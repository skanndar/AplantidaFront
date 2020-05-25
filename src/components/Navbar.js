import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import {
  SearchOutlined,
  SyncOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Input, Layout, Menu, Row, Col, Avatar } from "antd";
import axios from "axios";

const { Header } = Layout;

const { Search } = Input;

class Navbar extends Component {
  state = {
    plants: [],
  };


  search = (searchStr) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/plants",
        { searchStr },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        this.setState({ plants: response.data }, () => {
          this.props.history.push({
            pathname: "/search",
            state: { plants: this.state.plants },
          });
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider
    // and are injected by the withAuth HOC
    const { logout, isLoggedIn, isLoading, user } = this.props;
    const { search } = this;

    return (
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="containerLogo">
          <Link to={"/"}>
            <img src="/aplantidalogo.svg" className="logo" alt="logo" />
          </Link>
        </div>

        {!isLoading ? (
          isLoggedIn ? (
            <Menu
              className="menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
            >
              <Menu.Item key="1">
                <Link to={"/plants"}>
                  <SyncOutlined spin />
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={"/profile"}>
                  {user.image ? (
                    <Avatar src={user.image} />
                  ) : (
                    <Avatar>{user.fName}</Avatar>
                  )}
                </Link>
              </Menu.Item>
              <Menu.Item key="3" onClick={logout}>
                <LogoutOutlined />
              </Menu.Item>
            </Menu>
          ) : (
            <Menu
              className="menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
            >
              <Menu.Item key="1">
                <Link to={"/profile"}>
                  <UserOutlined />
                </Link>
              </Menu.Item>
            </Menu>
          )
        ) : null}

        <Search
          ref={(input) => input && input.focus()}
          className="searchBar"
          placeholder={isLoggedIn ? "Search plants" : "Login to search plants"}
          enterButton="search"
          // loading
          size="large"
          allowClear
          onSearch={(value) => {
            search(value);
          }}
        ></Search>
      </Header>
    );
  }
}

export default withRouter(withAuth(Navbar));
