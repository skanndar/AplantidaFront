import React, { Component } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Carousel, Card, Feedback } from "antd";
import { render } from "@testing-library/react";
import axios from "axios";

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

class PlantDetail extends Component {
  state = {
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
    const { plant, reviews } = this.state;
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
            <Card style={{ marginTop: 16 }} type="inner" title="Reviews">
              {plant.characteristics.reviews}
            </Card>
          </>
        ),
        tab2: (
          <p>
            <Feedback>check this</Feedback>
          </p>
        ),
      };
    }

    return plant ? (
      <Row className="plantDetail" justify="center" align="top">
        <Col>
          <Carousel autoplay>
            <div>
              <img
                style={{ marginTop: 16, minWidth: "288px" }}
                src={plant.img[0]}
                alt=""
              />
            </div>
            <div>
              <img
                style={{ marginTop: 16, minWidth: "288px" }}
                src={plant.img[1]}
                alt=""
              />
            </div>
          </Carousel>
        </Col>

        <Card
          style={{ width: "100%" }}
          title={<h1>{plant.latinName}</h1>}
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
