import React, { Component } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Carousel, Card } from "antd";
import { render } from "@testing-library/react";
import axios from "axios";

const plant = {
  characteristics: {
    knownHazards: {
      imgUrl: "https://pfaf.org/user/images/PFAF_searchV1b/hazardsmall.png",
      text:
        "The seed contains a mildly acrimonious principle that is unstable when heated. It is therefore best to cook the seed before eating it to ensure any possible toxicity is destroyed. This acrimonious principle is probably 4'-methoxypyridoxine, which can destroy vitamin B6[237]. It is more toxic for children, but the raw nuts would have to be eaten often over a period of time for the negative effects to become apparent[237]. Avoid if known allergy to Ginkgo or cross-react species (cashew, poison ivy). Not recommended for children. Avoid if on blood thinning medication (e.g. warfarin). Discontinue prior to surgery. Avoid parenteral use as possible hypotension, shock, dizziness. Excessive seed ingestion can cause 'gin-man' food poisoning [301].",
    },
    care: {
      imgUrl: [
        "https://pfaf.org/user/images/PFAF_Icon/H4.jpg",
        "https://pfaf.org/user/images/PFAF_Icon/water1.jpg",
        "https://pfaf.org/user/images/PFAF_Icon/water2.jpg",
        "https://pfaf.org/user/images/PFAF_Icon/sun.jpg",
      ],
    },
    family: "Ginkgoaceae",
    USDAHardiness: "3-8",
    habitats:
      "Found wild in only 2 localities at Guizhou and on the Anhui/Zhejiang border[200], where it grows on rich sandy soils[147].",
    range: "E. Asia - N. China.",
    edibilityRating: "(5 of 5)",
    otherUses: "(2 of 5)",
    weedPotential: "No",
    medicinalRating: "(5 of 5)",
  },
  img: [
    "https://pfaf.org/Admin/PlantImages/GinkgoBiloba2.jpg",
    "https://pfaf.org/Admin/PlantImages/GinkgoBiloba3.jpg",
  ],
  reviews: [],
  _id: "5ec54d234d0d58438e2a7916",
  commonName: "Maidenhair Tree, Ginkgo",
  latinName: "Ginkgo biloba",
  liked: 9,
  __v: 0,
};

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

const contentList = {
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

      <Card style={{ marginTop: 16 }} type="inner" title="Edibility Rating">
        {plant.characteristics.edibilityRating}
      </Card>
      <Card style={{ marginTop: 16 }} type="inner" title="Medicinal Rating">
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
  tab2: <p>content2</p>,
};

class PlantDetail extends Component {
  state = {
    plant: plant,
    key: "tab1",
  };
  
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    // Get the id from props.match.params.id
    console.log("this.state.plant :>> ", this.state.plant);
    // const {latinName} = this.state.plant
    const plant = this.state.plant;

    return (
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
    );
  }
}

export default PlantDetail;

// search = () => {
//   const searchStr = this.props.match.params.latinName;
//   console.log("plantLatinName :>> ", searchStr);
//   axios
//     .post(
//       "http://localhost:5000/plants",
//       { searchStr },
//       { withCredentials: true }
//     )
//     .then((response) => {
//       console.log("response", response);
//       this.setState({ plant: response.data[0] });
//     })
//     .catch((err) => console.log(err));
// };
// componentDidMount() {
//   this.search();
// }
