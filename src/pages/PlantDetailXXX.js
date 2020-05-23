import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Carousel } from "antd";

function PlantDetail(props) {
    // Get the id from props.match.params.id
  const plantLatinName = props.match.params.latinName;
            
        
  console.log('propsdetail :>> ', props.location.state);
  return (
    <div className='plantDetail'>
      <Carousel autoplay effect="fade">
        <div>
        {/* <img src={props.img[0]} alt=""/> */}
        </div>
        <div>
        {/* <img src={props.img[1]} alt=""/> */}
        </div>
        <div>
        </div>
        <div>
        </div>
      </Carousel>
      
    </div>
  );
}

export default PlantDetail;
