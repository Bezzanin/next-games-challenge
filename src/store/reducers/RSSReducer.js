import { Actions } from "../actions/RSSActions";
import moment from "moment";

const initialState = {
  rssFeed: [],
  ErrorMessage: false
};

const rssReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_RSS_FEED_SUCCESS:
      return {
        ...state,
        rssFeed: action.payload,
        ErrorMessage: action.error,
        lastUpdatedAt: moment().format("MMMM Do YYYY, h:mm:ss a")
      };
    case Actions.GET_RSS_FEED_FAILURE:
      return {
        ...state,
        rssFeed: [],
        ErrorMessage: action.payload,
        lastUpdatedAt: moment().format("MMMM Do YYYY, h:mm:ss a")
      };
    default:
      return state;
  }
};

export default rssReducer;
