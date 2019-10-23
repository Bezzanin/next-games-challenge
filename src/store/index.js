import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import RSSReducer from "./reducers/RSSReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  rss: RSSReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
