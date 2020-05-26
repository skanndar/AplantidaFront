import React, { Component } from "react";
import { Form, Input, Modal, Button, Rate } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import ImageDragger from "./ImageDragger";
import Axios from "axios";
import { withAuth } from "../lib/Auth";

const layout = {
  wrapperCol: {
    span: 24,
  },
};
let validateMessages = {
  required: "${name} is required!",
};

class ReviewModal extends Component {
  state = {
    ModalText: "",
    visible: false,
    confirmLoading: false,
  };

  onFinish = (values) => {
    console.log("this is the new review --> ", values);
    const { title, text, stars } = values;
    const user = this.props.user._id;
    const plant = this.props.plant._id;

    // Add review
    Axios.post(
      process.env.REACT_APP_API_URL + `/review`,
      { title, text, stars, user, plant },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        this.props.addReview(response.data);
        // this.props.search();
        console.log("response.data from review :>> ", response.data);
        this.handleOk();
      })

      .catch((err) => console.log("error :>> ", err));
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
          title="New Review"
          visible={visible}
          // onOk={() => {
          //   this.handleOk();
          //   this.onFinish();
          // }}
          // okText="Send"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          {
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
            >
              <p>{ModalText}</p>
              <Form.Item name="stars" rules={[{ required: true }]}>
                <Rate
                  initialValues={parseInt(Math.random() * 6)}
                  character={<HeartOutlined />}
                  allowHalf
                />
              </Form.Item>
              <Form.Item name="title" rules={[{ required: true }]}>
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item name="text" rules={[{ required: true }]}>
                <Input.TextArea placeholder="Write your comment here..." />
              </Form.Item>
              <Form.Item name="image">
                <ImageDragger />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          }
        </Modal>
      </div>
    );
  }
}

export default withAuth(ReviewModal);
