import { apiUrl } from "../../config/config";
import {
  FETCHING_DATA,
  FAILED_FETCHING_DATA,
  ADD_TWEETS,
  ADD_API_RESPONSE,
  FAILED_POSTING,
} from "../actionTypes";

export const postInput = (data) => {
  return fetch(`${apiUrl}/tweets-query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cors: "no-cors",
    credentials: "same-origin",
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        var err = new Error("ERROR");
        throw err;
      }
    })
    .then((response) => response)
    .catch((error) => error);
};

export const fetchTweets = (values) => (dispatch) => {
  dispatch(tweetsFetching());

  return fetch(`${apiUrl}/tweets-query`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cors: "no-cors",
    credentials: "same-origin",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        var err = new Error("ERROR");
        throw err;
      }
    })
    .then((response) => {
      response.country = values.country;
      return dispatch(addTweets(response))
    })
    .catch((error) => dispatch(errorFetchingTweets(error)));
};

const addTweets = (tweets) => {
  return {
    type: ADD_TWEETS,
    payload: tweets,
  };
};

const errorFetchingTweets = (error) => {
  return {
    type: FAILED_FETCHING_DATA,
    payload: error,
  };
};

const tweetsFetching = () => {
  return {
    type: FETCHING_DATA,
  };
};
