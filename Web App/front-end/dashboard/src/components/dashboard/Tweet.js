import React from "react";

const Tweet = (props) => {
  return (
    <div className="tweet">
      <div className="tweet-img">
        <img src="../../../assets/man.png" alt="" className="profile_icon" />
      </div>
      <div className="tweet-header">
        <span>{props.tweet.user_screen_name}</span>
        <span> . </span>
        <span>{props.tweet.created_at}</span>
      </div>
      <div>{props.tweet.tweet_text}</div>
    </div>
  );
};

export default Tweet;

// #1d2c4d
// #2c4371
// #0e1626
// #304a7d
