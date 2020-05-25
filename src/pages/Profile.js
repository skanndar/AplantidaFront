import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import { List, Avatar, Space, Rate, Row, Col, Carousel, Card } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { LikeOutlined, HeartTwoTone } from "@ant-design/icons";
import axios from "axios";
import Reviews from "../components/Reviews";
import ReviewModal from "../components/ReviewModal";
import UploaderAvatar from "./../components/UploadAvatar";
import EdiatableText from "../components/EdiatableText";

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
    plant: null,
    reviews: null,
    key: "tab1",
    user: null,
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "/auth/profile", {
        withCredentials: true,
      })
      .then((response) => {
        const user = response.data;
        this.setState({ user });
      })
      .catch((err) => console.log("error :>> ", err));
  }

  render() {
    const { plant, reviews, user } = this.state;
    let contentList;
    if (user) {
      contentList = {
        tab1: (
          <>
            <Row gutter={[16, 16]}>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Name">
                  <EdiatableText text={user.fName} />
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Lastname">
                  <EdiatableText text={user.lName} />
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Email">
                  <EdiatableText text={user.email} />
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Genre">
                  <EdiatableText text={user.genre} />
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Favorites">
                  {user.favorites.map((favorite) => {
                    return (
                      <>
                        <a href={`/plant/${favorite.latinName}`}>
                          {" "}
                          {favorite.latinName}{" "}
                        </a>
                        <br />
                      </>
                    );
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
            <UploaderAvatar size={256} shape="square">
              {user.image}
            </UploaderAvatar>
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
