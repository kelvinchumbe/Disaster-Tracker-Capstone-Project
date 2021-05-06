import React from "react";
import TweetItem from "./TweetItem";

const TweetsList = (props) => {
  return (
    <div className="tweets-list">
      {props.tweets.map((tweet) => (
        <TweetItem tweet={tweet} key={tweet.properties.tweet_id} />
      ))}
    </div>
  );
};

export default TweetsList;
