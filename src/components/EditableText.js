import React, { Component } from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

function EditableText(props) {
  // componentDidMount() {
  //   this.setState({ str: this.props.text });
  // }

  const onChange = (str) => {
    console.log("Content change:", str);
    // this.setState({ str });
    props.updateUserData(props.fieldName, str);
  };

  return <Paragraph editable={{ onChange: onChange }}>{props.text}</Paragraph>;
}

export default EditableText;
