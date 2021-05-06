import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/homepage/HomePage";
import Dashboard from "./components/dashboard/Dashboard";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FiltersBar from "./components/dashboard/FiltersBar";
import Button from "./components/dashboard/Switch";

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            {/* <Route path="/" exact render={() => <FiltersBar />} /> */}
            {/* <Route path="/" exact render={() => <Button />} /> */}
            <Route path="/" exact render={() => <HomePage />} />
            <Route
              path="/dashboard"
              render={() => <Dashboard tweets={this.props.tweets} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
