import { normalizedRestaurants } from "../fixtures";
import { ADD_REVIEW } from "./../constants/reviews";
import _ from "lodash";

export default (state = normalizedRestaurants, action) => {
  switch (action.type) {
    case ADD_REVIEW: {
      let { restaurantId, id: reviewId } = action.payload;

      let restaurant = _.find(state, r => r.id === restaurantId);
      if (restaurant) {
        let newState = [...state];
        restaurant.reviews.push(reviewId);
        return newState;
      }

      return state;
    }
    default:
      return state;
  }
};
