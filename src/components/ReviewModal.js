import React, { Component } from "react";
import { Form, Input, Modal, Button, Rate } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import ImageDragger from "./ImageDragger";

const layout = {
  wrapperCol: {
    span: 24,
  },
};
const validateMessages = {
  required: "${label} is required!",
};

class ReviewModal extends Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false,
  };

  onFinish = (values) => {
    console.log("this is the new review --> ", values);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div style={{ textAlign: "right" }}>
        <Button type="primary" onClick={this.showModal}>
          Add Review
        </Button>
        <Modal
          title="New Comment"
          visible={visible}
          onOk={()=> {
            this.handleOk()
            this.onFinish()}}
          okText="Send"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
            >
              <p>{ModalText}</p>
              <Form.Item name='stars' rules={[{ required: true }]}>
                <Rate
                  defaultValue={parseInt(Math.random() * 6)}
                  character={<HeartOutlined />}
                  allowHalf
                />
              </Form.Item>
              <Form.Item name='title' rules={[{ required: true }]}>
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item name={["text", "introduction"]}>
                <Input.TextArea placeholder="Write your comment here..." />
              </Form.Item>
              <Form.Item name={["image", "introduction"]}>
                <ImageDragger />
              </Form.Item>
            </Form>
          }
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;
