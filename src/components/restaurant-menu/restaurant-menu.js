import React from "react";
import Dish from "../dish";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createRestauranMenusSelector } from "./../../selectors";

function RestaurantMenu({ dishes }) {
  return (
    <div data-automation-id="menu" className="restaurant-menu">
      <Row gutter={16}>
        {dishes.map(d => (
          <Col key={d.id} span={8}>
            <Dish dishId={d.id} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

RestaurantMenu.propTypes = {
  restaurantId: PropTypes.any.isRequired
  // menu: PropTypes.arrayOf(PropTypes.shape(Dish.propTypes)).isRequired
};

const initMapStateToProps = () => {
  const restauranMenusSelector = createRestauranMenusSelector();
  return (state, props) => ({
    dishes: restauranMenusSelector(state, props)
  });
};

export default connect(initMapStateToProps)(RestaurantMenu);
