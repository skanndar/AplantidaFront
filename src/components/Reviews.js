import React from "react";
import { List, Avatar, Space, Rate } from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const listData = [];
for (let i = 0; i < 15; i++) {
  listData.push({
    href: "#",
    title: `Aplantida review simulation ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "ALIADOS",
    content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto incidunt error perspiciatis obcaecati accusamus hic a quam! Accusamus dicta ad praesentium nam consequuntur optio architecto ea, perferendis ipsum, cum tempore.`,
  });
}

// REVIEW MODEL
//   {
//     title: `Aplantida review simulation ${i}`,
//     text: String,
//     user: {type: Schema.Types.ObjectId,ref:'User'},
//     plant: {type: Schema.Types.ObjectId,ref:'Plant'},
//     likes: Number,
//     stars: Number
//   }

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Reviews(props) {
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
      dataSource={props.plant.reviews}
      footer={
        <div>
          <b>Designed by ALIADOS</b>
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
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
            title={<a href={item.href}>{item.title}</a>}
            description={props.plant.latinName}
          />
          {item.text}
        </List.Item>
      )}
    />
  );
}

export default Reviews;
