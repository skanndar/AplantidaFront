import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import { List, Avatar, Space, Rate, Row, Col, Carousel, Card } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { LikeOutlined, HeartTwoTone } from "@ant-design/icons";
import axios from "axios";
import Reviews from "../components/Reviews";
import ReviewModal from "../components/ReviewModal";

const tabList = [
  {
    key: "tab1",
    tab: "Profile",
  },
  {
    key: "tab2",
    tab: "My Reviews",
  },
];

const IconText = ({ icon, text }) => (
  <div style={{ textAlign: "right", paddingBottom: "5px" }}>
    {React.createElement(icon)}
    {text}
  </div>
);

class Profile extends Component {
  state = {
    user: this.props.user,
    plant: null,
    reviews: null,
    key: "tab1",
  };

  search = () => {
    //Get the id from props.match.params.id
    const name = this.props.match.params.latinName;
    console.log("plantLatinName :>> ", name);
    axios
      .get(`http://localhost:5000/plant/${name}`, { withCredentials: true })
      .then((response) => {
        console.log("response", response);
        this.setState({
          plant: response.data[0],
          reviews: response.data[0].reviews,
        });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.search();
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    const { user, plant, reviews } = this.state;
    console.log("this.state.plant :>> ", this.state.plant);
    let contentList;
    if (user) {
      contentList = {
        tab1: (
          <>
            <Row gutter={[16, 16]}>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Name">
                  {user.fName}
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Lastname">
                  {user.lName}
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Email">
                  {user.email}
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Genre">
                  {user.genre}
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Favorites">
                  {user.favorites.map((favorite) => {
                    return <h3>I am here</h3>;
                  })}
                </Card>
              </Col>
            </Row>
          </>
        ),
        tab2: <Reviews {...this.props}></Reviews>,
      };
    }

    return user ? (
      <Row className="userDetail" justify="center" align="top">
        <Col></Col>

        <Card
          style={{ width: "100%" }}
          title={
            <Avatar size={256} shape="square">
              {user.image}
            </Avatar>
          }
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={(key) => {
            this.onTabChange(key, "key");
          }}
        >
          {contentList[this.state.key]}
        </Card>
      </Row>
    ) : null;
  }
}

// class Profile extends Component {
//   render() {
//     console.log("this.props :>> ", this.props);
//     return (
//       <Row>
//         <Col>
//           <h1>Profile</h1>
//           {this.props.isLoggedIn ? (
//             <h3>Username: {this.props.user.fName}</h3>
//           ) : null}
//         </Col>
//       </Row>
//     );
//   }
// }

export default withAuth(Profile);
