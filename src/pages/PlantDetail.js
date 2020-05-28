import React, { Component } from "react";
import { Row, Col, Carousel, Card, Button } from "antd";
import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";
import axios from "axios";
import Reviews from "../components/Reviews";
import ReviewModal from "../components/ReviewModal";
import AplantidaIcon from "../components/AplantidaIcon";
import Axios from "axios";
import { withAuth } from "../lib/Auth";

const tabList = [
  {
    key: "tab1",
    tab: "Characteristics",
  },
  {
    key: "tab2",
    tab: "Reviews",
  },
];

const IconText = ({ icon, text }) => (
  <div style={{ textAlign: "right", paddingBottom: "5px" }}>
    {React.createElement(icon)}
    {text}
  </div>
);

class PlantDetail extends Component {
  state = {
    plant: null,
    reviews: null,
    key: "tab1",
    isLoading: true,
    favorite: null,
  };

  addReview = (review) => {
    console.log("review :>> ", review);
    const plantCopy = { ...this.state.plant };
    plantCopy.reviews.unshift(review);
    this.setState({ plant: plantCopy });
  };

  // shouldComponentUpdate(nextState) {
  //   return this.state.reviews !== nextState.reviews;
  // }

  search = () => {
    //Get the id from props.match.params.id
    const name = this.props.match.params.latinName;
    console.log("plantLatinName :>> ", name);
    axios
      .get(process.env.REACT_APP_API_URL + `/api/plant/${name}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response", response);
        const { user } = this.props;
        const plant = response.data;
        console.log("plant._id :>> ", plant._id);
        const checkIfFavorite =
          user.favorites.filter((favorite) => {
            console.log("favorite._id :>> ", favorite._id);
            return favorite._id == plant._id;
          }).length == 0;
        console.log("checkIfFavorite :>> ", checkIfFavorite);
        if (checkIfFavorite) {
          this.setState({
            plant: response.data,
            reviews: response.data.reviews,
            isLoading: false,
            favorite: true,
          });
        } else {
          this.setState({
            plant: response.data,
            reviews: response.data.reviews,
            isLoading: false,
            favorite: false,
          });
        }
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

  handleClick = () => {
    this.setState({ favorite: !this.state.favorite });
    Axios.put();
  };

  render() {
    const { plant, isLoading, favorite } = this.state;
    console.log("this.state.favorite :>> ", this.state.favorite);
    let contentList;
    if (plant && !isLoading) {
      contentList = {
        tab1: (
          <>
            <Card style={{ marginTop: 16 }} type="inner" title="Common Name">
              {plant.commonName}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Family">
              {plant.characteristics.family}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Habitats">
              {plant.characteristics.habitats}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Edibility Rating"
            >
              {plant.characteristics.edibilityRating}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Medicinal Rating"
            >
              {plant.characteristics.medicinalRating}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Other Uses">
              {plant.characteristics.otherUses}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Care">
              {plant.characteristics.care.imgUrl.map((img) => {
                return (
                  <>
                    <img src={img} alt="" />{" "}
                  </>
                );
              })}
            </Card>

            <Card style={{ marginTop: 16 }} type="inner" title="Range">
              {plant.characteristics.range}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Weed Potential">
              {plant.characteristics.weedPotential}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={
                <>
                  Known Hazards{" "}
                  <img src={plant.characteristics.knownHazards.imgUrl} alt="" />
                </>
              }
            >
              {plant.characteristics.knownHazards.text}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="USDA Hardiness">
              {plant.characteristics.USDAHardiness}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Liked">
              {plant.characteristics.liked}
            </Card>
          </>
        ),
        tab2: <Reviews data={plant}></Reviews>,
      };
    } else {
      contentList = {
        tab1: (
          <AplantidaIcon
            className="logoLoading"
            style={{ fontSize: "200px" }}
          />
        ),
        tab2: (
          <AplantidaIcon
            className="logoLoading"
            style={{ fontSize: "200px" }}
          />
        ),
      };
    }

    return plant ? (
      <Row className="plantDetail" justify="center" align="top">
        <Col>
          <Carousel autoplay style={{ maxHeight: "400px" }}>
            {plant.img.map((img) => {
              return (
                <>
                  <img
                    src={img}
                    style={{
                      minWidth: "100vw",
                      maxHeight: "auto",
                      transform: "translate(-0%, -30%)",
                    }}
                    alt={plant.latinName}
                  />
                </>
              );
            })}
          </Carousel>
        </Col>

        <Card
          style={{ width: "100%" }}
          title={
            <>
              <Row style={{ justifyContent: "space-between" }}>
                <h1> {plant.latinName}</h1>
                {this.state.key === "tab2" ? (
                  <ReviewModal
                    addReview={this.addReview}
                    search={this.search}
                    plant={plant}
                  />
                ) : null}
                <Button onClick={this.handleClick}>
                  {favorite ? (
                    <IconText
                      icon={HeartTwoTone}
                      // text={plant.liked}
                      key="list-vertical-like-o"
                    />
                  ) : (
                    <HeartOutlined />
                  )}
                </Button>
              </Row>
            </>
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

export default withAuth(PlantDetail);
