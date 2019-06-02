import { combineReducers } from "redux";
import counter from "./counter";
import cart from "./cart";
import restaurants from "./restaurants";
import dishes from "./dishes";
import reviews from "./reviews";
import users from "./users";

export default combineReducers({
  counter,
  restaurants,
  cart,
  dishes,
  reviews,
  users
});
