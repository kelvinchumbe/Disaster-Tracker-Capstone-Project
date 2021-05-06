import React from "react";

const TweetItem = (props) => {
  const category_color_mapping = {
    "Relief Request and Donations": "#27aeef",
    Casualty: "#ea5545",
    "Sympathy and Support": "#f46a9b",
    "Caution and Advice": "#87bc45",
    "Damage Report": "#ef9b20",
    "Search and Rescue": "#bdcf32",
  };

  const category_color =
    category_color_mapping[props.tweet.properties.category];

  return (
    <div className="tweet-item">
      <div className="tweet-item-header">
        <span className="tweet-username">
          {props.tweet.properties.user_screen_name}
        </span>
        <span>
          <b> . </b>
        </span>
        <span className="tweet-date">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(props.tweet.properties.created_at)))}
        </span>
      </div>
      <div className="tweet-text">{props.tweet.properties.tweet_text}</div>
      <div className="tweet-text">
        <div
          className="category-label"
          style={{ background: category_color }}
        ></div>
        <b>{props.tweet.properties.category}</b>
      </div>
    </div>
  );
};

export default TweetItem;
