import React from "react";
import { List } from "antd";
import Review from "../review";
import ReviewForm from "../review-form";
import PropTypes from "prop-types";

function ReviewList({ reviewIds, restaurantId }) {
  return (
    <List data-automation-id="review-list">
      {reviewIds.map(id => (
        <Review key={id} reviewId={id} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </List>
  );
}

ReviewList.propTypes = {
  reviewIds: PropTypes.arrayOf(PropTypes.any).isRequired,
  restaurantId: PropTypes.any.isRequired
};

export default ReviewList;
