import React, { Component } from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

export default class EditableText extends Component {
  state = {
    str: null,
  };

  componentDidMount() {
    this.setState({ str: this.props.text });
  }
  onChange = (str) => {
    console.log("Content change:", str);
    this.setState({ str });
    // this.props.updatedUserData()
  };

  render() {
    return (
      <Paragraph editable={{ onChange: this.onChange }}>
        {this.state.str}
      </Paragraph>
    );
  }
}
