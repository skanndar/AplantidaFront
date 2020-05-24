import React, { Component } from "react";
import { Row, Col, Carousel, Card } from "antd";
import { LikeOutlined, HeartTwoTone } from "@ant-design/icons";
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
  <div style={{ textAlign: "right", paddingBottom: '5px' }}>
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
          </>
        ),
        tab2: <Reviews {...this.props}></Reviews>,
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
          title={
            <>
              {
                <IconText
                  icon={HeartTwoTone}
                  text={parseInt(Math.random() * 144 * 9)}
                  key="list-vertical-like-o"
                />
              }
              <Row style={{ justifyContent: "space-between" }}>
                <h1> {plant.latinName}</h1> 
                {
                this.state.key === 'tab2' ? <ReviewModal /> : null
                }
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

// import { Form, Input, InputNumber, Button } from 'antd';

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not validate email!',
//     number: '${label} is not a validate number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };

// const Demo = () => {
//   const onFinish = values => {
//     console.log(values);
//   };

//   return (
//     <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
//       <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
//         <InputNumber />
//       </Form.Item>
//       <Form.Item name={['user', 'website']} label="Website">
//         <Input />
//       </Form.Item>
//       <Form.Item name={['user', 'introduction']} label="Introduction">
//         <Input.TextArea />
//       </Form.Item>
//       <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };
