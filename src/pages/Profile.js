import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import { Row, Col, Card, Avatar, Button } from "antd";
import Reviews from "../components/Reviews";
import UploaderAvatar from "./../components/UploadAvatar";
import EditableText from "../components/EditableText";
import { Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";
import axiosRequestFunctions from "./../lib/auth-service";

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

class Profile extends Component {
  state = {
    key: "tab1",
    user: null,
  };

  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key });
  };

  //
  updateUserData = (key, value) => {
    const userCopy = { ...this.state.user };
    userCopy[key] = value;
    this.setState({ user: userCopy }, () => {
      const { fName, lName, image, email, genre } = this.state.user;
      axiosRequestFunctions
        .userData(fName, lName, image, email, genre)
        .then((response) => {
          // console.log("response.data put :>> ", response);
          const user = response.data;
        })
        .catch((err) => console.log("error :>> ", err));
    });
  };

  userProfile = () => {
    axiosRequestFunctions
      .profile()
      .then((response) => {
        // console.log("response.data :>> ", response.data);
        const user = response.data;
        this.setState({ user });
      })
      .catch((err) => console.log("error :>> ", err));
  };

  handleDelete = (plantId) => {
    const userCopy = { ...this.state.user };
    const newFavorites = userCopy.favorites.filter((plants) => {
      return plants._id !== plantId;
    });
    userCopy.favorites = newFavorites;
    // console.log("userCopy :>> ", userCopy);
    this.setState({ user: userCopy }, () => {
      axiosRequestFunctions
        .favorites(plantId)
        .then((response) => {
          // console.log("user after deleted favorite :>> ", response.data);
          this.props.me();
        })
        .catch((err) => console.log("error :>> ", err));
    });
  };

  componentDidMount() {
    axiosRequestFunctions
      .profile()
      .then((response) => {
        // console.log("response.data :>> ", response.data);
        const user = response.data;
        this.setState({ user });
      })
      .catch((err) => console.log("error :>> ", err));
  }

  render() {
    const { user } = this.state;
    // console.log("user from profile reviews :>> ", user);
    let contentList;
    if (user) {
      contentList = {
        tab1: (
          <>
            <Row gutter={[16, 16]}>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Name">
                  <EditableText
                    updateUserData={this.updateUserData}
                    text={user.fName}
                    fieldName="fName"
                  />
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Lastname">
                  <EditableText
                    updateUserData={this.updateUserData}
                    text={user.lName}
                    fieldName="lName"
                  />
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Email">
                  <EditableText
                    updateUserData={this.updateUserData}
                    text={user.email}
                    fieldName="email"
                  />
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Genre">
                  <EditableText
                    updateUserData={this.updateUserData}
                    text={user.genre}
                    fieldName="genre"
                  />
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: 16 }} type="inner" title="Favorites">
                  {user.favorites.map((favorite) => {
                    return (
                      <>
                        <Row justify="space-between" gutter={32}>
                          <Col span={18}>
                            <Link
                              to={`/plant/${favorite.latinName}/${favorite._id}`}
                            >
                              <Avatar
                                style={{ margin: 2 }}
                                src={favorite.img[0]}
                                shape="square"
                              />{" "}
                              <span>{favorite.latinName}</span>
                            </Link>
                          </Col>
                          <Col span={6}>
                            <Button
                              onClick={() => this.handleDelete(favorite._id)}
                              ghost
                            >
                              <DeleteTwoTone twoToneColor="#43bd26" />
                            </Button>
                          </Col>
                        </Row>
                      </>
                    );
                  })}
                </Card>
              </Col>
            </Row>
          </>
        ),
        tab2: (
          //Uros trick to rerender frocing key change
          <Reviews key={Math.floor(Math.random() * 1000)} data={user}></Reviews>
        ),
      };
    }

    return user ? (
      <Row className="userDetail" justify="center" align="top">
        <Col></Col>

        <Card
          style={{ width: "100%" }}
          title={
            <UploaderAvatar
              updateUser={this.userProfile}
              size={256}
              shape="square"
            >
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

export default withAuth(Profile);
