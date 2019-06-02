import { ADD_REVIEW } from "../constants/reviews";
import { normalizedReviews } from "../fixtures";

export default (state = normalizedReviews, action) => {
  switch (action.type) {
    case ADD_REVIEW: {
      let review = action.payload;
      return [
        ...state,
        {
          id: review.id,
          userId: review.userId,
          text: review.text,
          rating: review.rating
        }
      ];
    }
    default:
      return state;
  }
};
