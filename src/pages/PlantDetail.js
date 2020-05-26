import React, { Component } from "react";
import { Row, Col, Carousel, Card } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import axios from "axios";
import Reviews from "../components/Reviews";
import ReviewModal from "../components/ReviewModal";

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
      .get(process.env.REACT_APP_API_URL + `/plant/${name}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response", response);
        this.setState({
          plant: response.data,
          reviews: response.data.reviews,
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
    const { plant } = this.state;
    console.log("this.state.plant :>> ", this.state.plant);
    let contentList;
    if (plant) {
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
    }

    return plant ? (
      <Row className="plantDetail" justify="center" align="top">
        <Col>
          <Carousel autoplay>
            {plant.img.map((img) => {
              return (
                <>
                  <img
                    src={img}
                    style={{ minWidth: "288px" }}
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
              {
                <IconText
                  icon={HeartTwoTone}
                  text={plant.liked}
                  key="list-vertical-like-o"
                />
              }
              <Row style={{ justifyContent: "space-between" }}>
                <h1> {plant.latinName}</h1>
                {this.state.key === "tab2" ? (
                  <ReviewModal
                    addReview={this.addReview}
                    search={this.search}
                    plant={plant}
                  />
                ) : null}
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

export default PlantDetail;
