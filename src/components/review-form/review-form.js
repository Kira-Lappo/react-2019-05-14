import React, { Component } from "react";
import { connect } from "react-redux";
import { Comment, Rate, Input, Button } from "antd";
import { addReview } from "../../ac";
import { PropTypes } from "prop-types";

import "./review-form";

class ReviewForm extends Component {
  static propTypes = {
    restaurantId: PropTypes.any.isRequired
  };

  state = {
    userName: "",
    rating: 0,
    text: ""
  };

  onSendClick = () => {
    const { addReview, restaurantId } = this.props;
    addReview({
      ...this.state,
      restaurantId
    });
  };

  onRatingChange = e => {
    this.setState({
      rating: e
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { userName, rating, text } = this.state;
    return (
      <Comment
        className={"review-form"}
        content={
          <>
            <Input
              name="userName"
              placeholder="Name"
              value={userName}
              onChange={this.onChange}
            />
            <Rate allowHalf value={rating} onChange={this.onRatingChange} />
            <Input.TextArea
              name="text"
              placeholder="Enter your review here..."
              value={text}
              onChange={this.onChange}
            />
          </>
        }
        actions={[
          <Button type="primary" onClick={this.onSendClick}>
            Send review
          </Button>
        ]}
      />
    );
  }
}

export default connect(
  (_, p) => p,
  {
    addReview
  }
)(ReviewForm);
