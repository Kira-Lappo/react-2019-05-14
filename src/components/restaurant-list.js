import React, { Component } from "react";
import Restaurant from "./restaurant";
import { accordion } from "../decorators/accordion";

class RestaurantList extends Component {
  render() {
    const {
      restaurants,

      // props from accordion decorator
      openedMenuItemId,
      toggleOpenMenuItem,
      openedReviewsItemId,
      toggleOpenReviewsItem
    } = this.props;
    return (
      <div>
        {restaurants.map(restaurant => (
          <Restaurant
            key={restaurant.id}
            {...restaurant}
            isMenuOpened={openedMenuItemId === restaurant.id}
            toggleOpenMenu={toggleOpenMenuItem}
            areReviewsOpened={openedReviewsItemId === restaurant.id}
            toggleOpenReviews={toggleOpenReviewsItem}
          />
        ))}
      </div>
    );
  }
}

export default accordion(RestaurantList);
