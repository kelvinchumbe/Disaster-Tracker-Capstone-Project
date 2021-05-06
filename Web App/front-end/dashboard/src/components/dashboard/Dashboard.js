import React, { Component } from "react";
import Map from "./Map";
import Header from "../common/Header";
import CategoryDist from "./CategoryDist";
import HashtagDist from "./HashtagDist";
import TweetList from "./TweetsList";
// import FiltersBar from "./FiltersBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.start_datetime = new Date(
      Date.parse(new Date().toLocaleDateString() + " 00:00:00")
    );

    this.end_datetime = new Date(
      Date.parse(new Date().toLocaleDateString() + " 23:59:59")
    );

    this.state = {
      category: "All",
      start_date: this.start_datetime,
      end_date: this.end_datetime,
      start_time: this.start_datetime,
      end_time: this.end_datetime,
      mapping: "Individual Tweets",
      isFiltered: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.handleMappingChange = this.handleMappingChange.bind(this);
  }

  resetFilter() {
    const start_datetime = new Date(
      Date.parse(new Date().toLocaleDateString() + " 00:00:00")
    );

    const end_datetime = new Date(
      Date.parse(new Date().toLocaleDateString() + " 23:59:59")
    );

    this.setState({
      category: "",
      start_date: start_datetime,
      end_date: end_datetime,
      start_time: start_datetime,
      end_time: end_datetime,
      mapping: "Individual Tweets",
      isFiltered: false,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isFiltered: true,
    });
  }

  handleMappingChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleDateRangeChange(dates) {
    const [start_date, end_date] = dates;

    console.log(start_date);
    console.log(end_date);

    this.setState({
      start_date: start_date,
      end_date: end_date,
      isFiltered: true,
      // start_time: start_date,
      start_time: new Date(
        Date.parse(start_date.toLocaleDateString() + " 00:00:00")
      ),
    });

    if (end_date) {
      this.setState({
        // end_time: end_date,
        end_time: new Date(
          Date.parse(end_date.toLocaleDateString() + " 23:59:59")
        ),
      });
    }
  }

  handleTimeStartChange(start_time) {
    this.setState({
      start_time: start_time,
      isFiltered: true,
    });
  }

  handleTimeEndChange(end_time) {
    this.setState({
      end_time: end_time,
      isFiltered: true,
    });
  }

  formatDate(date) {
    if (date !== null) {
      return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(Date.parse(date)));
    }

    // return new Intl.DateTimeFormat("en-GB", {
    //   year: "numeric",
    //   month: "short",
    //   day: "2-digit",
    // }).format(new Date());
  }

  formatTime(datetime) {
    // console.log(datetime);
    if (datetime !== null) {
      return new Intl.DateTimeFormat("en-GB", {
        timeStyle: "short",
      }).format(new Date(Date.parse(datetime)));
    }
  }

  render() {
    let filtered_tweets = [];

    if (this.state.isFiltered) {
      filtered_tweets = [];
    } else {
      filtered_tweets = this.props.tweets.tweets;
    }
    this.props.tweets.tweets.forEach((tweet) => {
      if (this.state.category !== "All") {
        if (
          this.state.isFiltered &&
          tweet.properties.category === this.state.category &&
          new Date(Date.parse(tweet.properties.created_at)) >=
            new Date(Date.parse(this.state.start_date)) &&
          new Date(Date.parse(tweet.properties.created_at)) <=
            new Date(Date.parse(this.state.end_date)) &&
          new Date(Date.parse(tweet.properties.created_at)) >=
            new Date(Date.parse(this.state.start_time)) &&
          new Date(Date.parse(tweet.properties.created_at)) <=
            new Date(Date.parse(this.state.end_time))
        ) {
          filtered_tweets.push(tweet);
        }
      } else {
        if (
          this.state.isFiltered &&
          new Date(Date.parse(tweet.properties.created_at)) >=
            new Date(Date.parse(this.state.start_date)) &&
          new Date(Date.parse(tweet.properties.created_at)) <=
            new Date(Date.parse(this.state.end_date)) &&
          new Date(Date.parse(tweet.properties.created_at)) >=
            new Date(Date.parse(this.state.start_time)) &&
          new Date(Date.parse(tweet.properties.created_at)) <=
            new Date(Date.parse(this.state.end_time))
        ) {
          filtered_tweets.push(tweet);
        }
      }
    });

    // if (this.props.tweets.tweets && this.props.tweets.tweets.length !== 0) {
    //   filtered_tweets = this.props.tweets.tweets.filter((tweet) => {
    //     return (
    //       this.state.isFiltered &&
    //       tweet.properties.category === this.state.category &&
    //       new Date(Date.parse(tweet.properties.created_at)) >=
    //         new Date(Date.parse(this.state.start_date)) &&
    //       new Date(Date.parse(tweet.properties.created_at)) <=
    //         new Date(Date.parse(this.state.end_date)) &&
    //       new Date(Date.parse(tweet.properties.created_at)) >=
    //         new Date(Date.parse(this.state.start_time)) &&
    //       new Date(Date.parse(tweet.properties.created_at)) <=
    //         new Date(Date.parse(this.state.end_time))
    //     );
    //   });
    // }

    const categories = [
      "Casualty",
      "Sympathy and Support",
      "Caution and Advice",
      "Damage Report",
      "Relief Request and Donations",
    ];

    return (
      <div className="dashboard-body">
        <Header />

        <div className="filters-bar">
          <div className="filter">
            <div className="filter-input ">
              <label htmlFor="start_date" className="filter-input-label">
                Date
              </label>

              <div
                className="filter-date-container"
                onClick={() =>
                  this.setState({
                    toggleDate: !this.state.toggleDate,
                    toggleTime: false,
                  })
                }
              >
                {`${this.formatDate(this.state.start_date)} - ${this.formatDate(
                  this.state.end_date
                )}`}
                <img src="../../assets/down-chevron.png" className="chevron" />
              </div>

              {this.state.toggleDate ? (
                <>
                  <DatePicker
                    selected={this.state.start_date}
                    onChange={this.handleDateRangeChange}
                    startDate={this.state.start_date}
                    endDate={this.state.end_date}
                    selectsRange
                    inline
                    className="date-picker"
                  />
                </>
              ) : (
                <div></div>
              )}
            </div>

            <div className="filter-input">
              <label htmlFor="start_time" className="filter-input-label">
                Time
              </label>

              <div
                className="filter-date-container"
                onClick={() =>
                  this.setState({
                    toggleTime: !this.state.toggleTime,
                    toggleDate: false,
                  })
                }
              >
                {`${this.formatTime(this.state.start_time)} - ${this.formatTime(
                  this.state.end_time
                )}`}
                <img src="../../assets/down-chevron.png" className="chevron" />
              </div>

              {this.state.toggleTime ? (
                <>
                  <DatePicker
                    selected={this.state.start_time}
                    dateFormat="h:mm aa"
                    className="filter-input-time"
                    name="start_time"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    onChange={(start_time) =>
                      this.setState({ start_time: start_time })
                    }
                  />

                  <DatePicker
                    selected={this.state.end_time}
                    dateFormat="h:mm aa"
                    className="filter-input-time"
                    name="end_time"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    onChange={(end_time) => {
                      this.setState({
                        end_time: end_time,
                      });
                    }}
                  />
                </>
              ) : (
                <div></div>
              )}
            </div>

            <div className="filter-input">
              <label htmlFor="category" className="filter-input-label">
                Category
              </label>
              <div>
                <select
                  name="category"
                  className="filter-field-category"
                  value={this.state.category}
                  onChange={this.handleChange}
                  onFocus={() =>
                    this.setState({ toggleDate: false, toggleTime: false })
                  }
                >
                  {categories.map((category, i) => {
                    return (
                      <option value={category} key={i}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="filter-input">
              <label htmlFor="mapping" className="filter-input-label">
                Mapping
              </label>
              <div>
                <select
                  name="mapping"
                  className="filter-field-mapping"
                  value={this.state.mapping}
                  onChange={this.handleMappingChange}
                  onFocus={() =>
                    this.setState({ toggleDate: false, toggleTime: false })
                  }
                >
                  {["Individual Tweets", "Clusters"].map((mapping, i) => {
                    return (
                      <option value={mapping} key={i}>
                        {mapping}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="filter-input">
              {/* <div className="filter-clear"> */}
              <button className="filter-clear" onClick={this.resetFilter}>
                Clear
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>

        {this.props.tweets.isFetching ? (
          <div className="spinner">
            <img
              src="../../../assets/Spinner-1.1s-234px.gif"
              alt="Loading"
              className="spinner-image"
            />
          </div>
        ) : (
          <div className="dashboard">
            <div className="dashboard-left">
              <div className="crowdmap">
                <Map tweets={filtered_tweets} mapping={this.state.mapping} />
              </div>

              <div className="category-dist">
                <h2>Category Distribution</h2>
                <CategoryDist tweets={filtered_tweets} />
              </div>

              <div className="hashtag-dist">
                <h2>Hashtag Distribution</h2>
                <HashtagDist tweets={filtered_tweets} />
              </div>
            </div>

            <div className="dashboard-right">
              <div>
                <TweetList tweets={filtered_tweets} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
