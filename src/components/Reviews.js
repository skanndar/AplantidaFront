import React, { useState, useEffect } from "react";
import { List, Avatar, Space, Rate, Button } from "antd";
import { withAuth } from "../lib/Auth";
import {
  MessageOutlined,
  LikeOutlined,
  HeartOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axiosRequestFunctions from "./../lib/auth-service";

function Reviews(props) {
  const [reviews, setReviews] = useState(props.data.reviews);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const handleDelete = (reviewId) => {
    axiosRequestFunctions
      .deleteReview(reviewId)
      .then((response) => {
        // console.log("response.data :>> ", response);
        const reviewId = response._id;
        const newReviewsArray = reviews.filter((review) => {
          return review._id !== reviewId;
        });
        // console.log("newReviewsArray :>> ", newReviewsArray);
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
              text={item.likes}
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
            avatar={<Avatar src={item.user.image} />}
            title={
              <>
                <Link to="/profile">{item.title}</Link>{" "}
                {props.user._id === item.user._id ? (
                  <Button onClick={() => handleDelete(item._id)} type="ghost">
                    <DeleteTwoTone twoToneColor="#43bd26" />
                  </Button>
                ) : null}
              </>
            }
            description={
              <Link to={`/plant/${item.plant.latinName}`}>
                {item.plant.latinName}
              </Link>
            }
          />
          {item.text}
        </List.Item>
      )}
    />
  );
}

export default React.memo(withAuth(Reviews));
