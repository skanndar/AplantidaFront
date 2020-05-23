import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

export default function PlantCard(props) {

  return (
    <div>
      <Link {...props} to={`/plant/${props.latinName}`}>
        <Card
          {...props}
          hoverable
          size="small"
          style={{ width: "20vw", minWidth: 288 }}
          cover={
            <div
              style={{
                height: 220,
                width: "20vw",
                minWidth: 288,
                overflow: "hidden",
              }}
            >
              {" "}
              <img
                style={{ width: "20vw", minWidth: 288 }}
                alt={props.latinName}
                src={props.img[0]}
              />
            </div>
          }
        >
          <Meta
            title={props.latinName}
            description={props.characteristics.habitats}
          />
        </Card>
      </Link>
    </div>
  );
}
