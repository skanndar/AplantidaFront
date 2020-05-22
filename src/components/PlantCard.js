import React from "react";
import { Card } from "antd";
const { Meta } = Card;

export default function PlantCard(props) {
  return (
    <div>
      <Card
        hoverable
        size="small"
        style={{ width: 340 }}
        cover={<img style={{ width: 100 }} alt="example" src={props.img[0]} />}
      >
        <Meta
          title={props.latinName}
          description={props.characteristics.habitats}
        />
      </Card>
    </div>
  );
}
