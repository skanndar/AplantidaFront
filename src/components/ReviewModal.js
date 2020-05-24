import React, { Component } from "react";
import { Form, Input, Modal, Button } from "antd";

const layout = {
  wrapperCol: {
    span: 16,
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
    console.log(values);
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
          title="Title"
          visible={visible}
          onOk={this.handleOk}
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
              <Form.Item rules={[{ required: true }]}>
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item name={["user", "introduction"]}>
                <Input.TextArea placeholder="Write your comment here..." />
              </Form.Item>
            </Form>
          }
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;
