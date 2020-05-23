import React, { Component } from "react";
import "./App.less";
import { Switch, Route } from "react-router-dom";

// PAGES & COMPONENTS
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Private from "./pages/Private";
import PlantsList from "./pages/PlantsList";
import PlantDetail from "./pages/PlantDetail";
import RegistrationForm from "./pages/RegistrationForm";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

import { Layout, Row, Col } from "antd";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    
    return (
      <>
        <Layout>
          <Navbar></Navbar>

          <Content
            className="site-layout"
            style={{ padding: "0 10px", marginTop: 114 }}
          >
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
                <PrivateRoute exact path="/search" component={PlantsList} />
                <PrivateRoute exact path="/plant/:latinName" component={PlantDetail} />
                {/* <PrivateRoute
                  exact
                  path="/plant/:latinName"
                  render={(props) => <PlantDetail {...props} isAuthed={true} />}
                /> */}
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

//  {/* <Breadcrumb style={{ margin: "16px 0" }}>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item>List</Breadcrumb.Item>
//             <Breadcrumb.Item>App</Breadcrumb.Item>
//           </Breadcrumb> */}
