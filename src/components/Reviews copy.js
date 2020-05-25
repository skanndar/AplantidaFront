import React, { Component } from "react";
import { List, Avatar, Space, Rate, Button } from "antd";
import { withAuth } from "../lib/Auth";
import {
  MessageOutlined,
  LikeOutlined,
  HeartOutlined,
  DeleteOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import Axios from "axios";

class Reviews extends Component {
  state = {
    reviews: null,
  };

  componentDidMount() {
    const { reviews } = this.props.data;
    this.setState({ reviews });
  }

  handleDelete = (reviewId) => {
    Axios.delete(process.env.REACT_APP_API_URL + `/review/${reviewId}`, {
      withCredentials: true,
    })
      .then((response) => {
        console.log("response.data :>> ", response.data);
        const reviewId = response.data._id;
        const newReviewsArray = this.state.reviews.filter((review) => {
          return review._id !== reviewId;
        });
        console.log("newReviewsArray :>> ", newReviewsArray);
        this.setState({ reviews: newReviewsArray });
      })
      .catch((err) => console.log("error :>> ", err));
  };

  render() {
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        dataSource={this.state.reviews}
        footer={
          <div>
            <b>Designed by ALIADOS</b>
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item._id}
            actions={[
              <Rate
                disabled
                defaultValue={item.stars}
                character={<HeartOutlined />}
                allowHalf
              />,
              <IconText
                icon={LikeOutlined}
                text={item.likes}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={parseInt(Math.random() * 144 * 9)}
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <>
                  <a href={item.href}>{item.title}</a>{" "}
                  {this.props.user._id === item.user ? (
                    <Button
                      onClick={() => this.handleDelete(item._id)}
                      type="ghost"
                    >
                      <DeleteTwoTone twoToneColor="#43bd26" />
                    </Button>
                  ) : null}
                </>
              }
              description={this.props.data.latinName}
            />
            {item.text}
          </List.Item>
        )}
      />
    );
  }
}

export default withAuth(Reviews);

// REVIEW MODEL
//   {
//     title: `Aplantida review simulation ${i}`,
//     text: String,
//     user: {type: Schema.Types.ObjectId,ref:'User'},
//     plant: {type: Schema.Types.ObjectId,ref:'Plant'},
//     likes: Number,
//     stars: Number
//   }

// const listData = [];
// for (let i = 0; i < 15; i++) {
//   listData.push({
//     href: "#",
//     title: `Aplantida review simulation ${i}`,
//     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
//     description: "ALIADOS",
//     content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto incidunt error perspiciatis obcaecati accusamus hic a quam! Accusamus dicta ad praesentium nam consequuntur optio architecto ea, perferendis ipsum, cum tempore.`,
//   });
// }
