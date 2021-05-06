import {
  FETCHING_DATA,
  FAILED_FETCHING_DATA,
  ADD_TWEETS,
  ADD_API_RESPONSE,
  FAILED_POSTING,
} from "../actionTypes";

const initialState = {
  tweets: [],
  error: null,
  isFetching: true,
  country: null,
};

export const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TWEETS:
      return {
        ...state,
        tweets: action.payload.tweets,
        isFetching: false,
        country: action.payload.country,
      };

    case FETCHING_DATA:
      return {
        ...state,
      };

    case FAILED_FETCHING_DATA:
      return {
        ...state,
        error: action.payload,
      };

    case FAILED_POSTING:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
