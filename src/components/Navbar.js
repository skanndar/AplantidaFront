import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import {
  SearchOutlined,
  SyncOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Input, Layout, Menu, Row, Col } from "antd";
import axios from "axios";

const { Header, Content, Footer } = Layout;

const { Search } = Input;

class Navbar extends Component {
  //   componentDidMount() {
  //     this.refs.linkInput.focus()
  // }

  state = {
    plants: [],
  };

  search = (searchStr) => {
    axios
      .post(
        "http://localhost:5000/plants",
        { searchStr },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        this.setState({ plants: response.data }, 
          ()=>{
            this.props.history.push({
              pathname:'/search',
              state:{plants:this.state.plants}
            })

          });
        

      })
      .catch((err) => console.log(err));
  };

  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider
    // and are injected by the withAuth HOC
    const { logout, isLoggedIn } = this.props;
    const { search } = this;

    return (
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="containerLogo">
          <Link to={"/"}>
            <img src="/logo.png" className="logo" alt="logo" />
          </Link>
        </div>

        {isLoggedIn ? (
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
              <Link to={"/private"}>
                <UserOutlined />
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <LogoutOutlined onClick={logout} />
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
              <Link to={"/private"}>
                <UserOutlined />
              </Link>
            </Menu.Item>
          </Menu>
        )}

        <Search
          ref={(input) => input && input.focus()}
          className="searchBar"
          placeholder="Search plants"
          enterButton="search"
          // loading
          size="large"
          alldowClear
          onSearch={(value) => {
            search(value);
          }}
        ></Search>
      </Header>
    );
  }
}

export default withRouter(withAuth(Navbar));
