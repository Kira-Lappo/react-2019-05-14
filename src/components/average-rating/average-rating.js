import React, { PureComponent } from "react";
import { Rate } from "antd";
import PropTypes from "prop-types";
import { createRestaurantAverageRateSelector } from "./../../selectors";
import { connect } from "react-redux";

class AverageRating extends PureComponent {
  state = {
    value: 0
  };

  render() {
    const { averageRating } = this.props;
    const normalizedRating = Math.floor(averageRating * 2) / 2;
    return <Rate value={normalizedRating} disabled allowHalf />;
  }
}

AverageRating.propTypes = {
  restaurantId: PropTypes.any.isRequired
};

const initMapStateToProps = () => {
  const averageRatingSelector = createRestaurantAverageRateSelector();
  return (state, props) => ({
    averageRating: averageRatingSelector(state, props)
  });
};

export default connect(initMapStateToProps)(AverageRating);
