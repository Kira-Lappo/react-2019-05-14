import React from "react";
import { Comment, Rate } from "antd";
import PropTypes from "prop-types";
import "./review.css";
import { connect } from "react-redux";
import { createReviewSelector } from "../../selectors";
import { createReviewAuthorSelector } from "./../../selectors";

function Review({ review, author }) {
  return (
    <Comment
      className="review"
      author={author.name}
      content={review.text}
      actions={[
        <Rate
          disabled
          allowHalf
          defaultValue={review.rating}
          className="review-rating"
        />
      ]}
    />
  );
}

Review.propTypes = {
  reviewId: PropTypes.any.isRequired,
  author: PropTypes.object.isRequired
};

const initMapStateToProps = () => {
  const reviewSelector = createReviewSelector();
  const reviewAuthorSelector = createReviewAuthorSelector();
  return (state, props) => ({
    review: reviewSelector(state, props),
    author: reviewAuthorSelector(state, props)
  });
};

export default connect(initMapStateToProps)(Review);
