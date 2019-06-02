import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import logger from "../middlewares";
import reviews from "../middlewares/reviews";
import { composeWithDevTools } from "redux-devtools-extension";

const enhancer = composeWithDevTools(applyMiddleware(logger, reviews));

const store = createStore(reducer, enhancer);

// dev mode
window.store = store;

export default store;
