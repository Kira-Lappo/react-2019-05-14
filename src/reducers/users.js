import { normalizedUsers } from "../fixtures";
import { ADD_REVIEW } from "./../constants/reviews";
import _ from "lodash";

export default (state = normalizedUsers, action) => {
  switch (action.type) {
    case ADD_REVIEW: {
      let { userId, userName } = action.payload;
      let user = _.find(state, u => u.id === userId);
      if (user) {
        return state;
      }

      return [
        ...state,
        {
          id: userId,
          name: userName
        }
      ];
    }
    default:
      return state;
  }
};
