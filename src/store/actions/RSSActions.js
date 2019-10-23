import Parser from "rss-parser";

export const Actions = {
  GET_RSS_FEED_SUCCESS: "GET_RSS_FEED_SUCCESS",
  GET_RSS_FEED_FAILURE: "GET_RSS_FEED_FAILURE"
};

export const fetchRSS = rssUrl => {
  return async (dispatch, getState) => {
    const parser = new Parser();
    try {
      const feed = await parser.parseURL(rssUrl);
      return dispatch({
        type: Actions.GET_RSS_FEED_SUCCESS,
        payload: feed.items
      });
    } catch (e) {
      return dispatch({
        type: Actions.GET_RSS_FEED_FAILURE,
        payload: e.message
      });
    }
  };
};
