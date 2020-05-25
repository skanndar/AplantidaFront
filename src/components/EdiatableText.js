import React, { Component } from 'react'
import { Typography } from 'antd';

const { Paragraph } = Typography;

export default class EdiatableText extends Component {
    state = {
        str: this.props.text,
      };
    
      onChange = str => {
        console.log('Content change:', str);
        this.setState({ str });
      };
    
      render() {
        return (
            <Paragraph editable={{ onChange: this.onChange }}>{this.state.str}</Paragraph>
        );
      }
    }
