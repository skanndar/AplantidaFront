import React, { Component, useState } from "react";
import { List, Avatar, Space, Rate, Button } from "antd";
import { withAuth } from "../lib/Auth";
import {
  MessageOutlined,
  LikeOutlined,
  HeartOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import Axios from "axios";

function Reviews(props) {
  const [reviews, setReviews] = useState(props.data.reviews);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const handleDelete = (reviewId) => {
    Axios.delete(process.env.REACT_APP_API_URL + `/review/${reviewId}`, {
      withCredentials: true,
    })
      .then((response) => {
        console.log("response.data :>> ", response.data);
        const reviewId = response.data._id;
        const newReviewsArray = reviews.filter((review) => {
          return review._id !== reviewId;
        });
        console.log("newReviewsArray :>> ", newReviewsArray);
        setReviews(newReviewsArray);
      })
      .catch((err) => console.log("error :>> ", err));
  };

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
      dataSource={reviews}
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
                {props.user._id === item.user ? (
                  <Button onClick={() => handleDelete(item._id)} type="ghost">
                    <DeleteTwoTone twoToneColor="#43bd26" />
                  </Button>
                ) : null}
              </>
            }
            description={props.data.latinName}
          />
          {item.text}
        </List.Item>
      )}
    />
  );
}

export default withAuth(Reviews);

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

// REVIEW MODEL
//   {
//     title: `Aplantida review simulation ${i}`,
//     text: String,
//     user: {type: Schema.Types.ObjectId,ref:'User'},
//     plant: {type: Schema.Types.ObjectId,ref:'Plant'},
//     likes: Number,
//     stars: Number
//   }
