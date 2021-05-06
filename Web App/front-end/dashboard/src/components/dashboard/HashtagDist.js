import React, { Component } from "react";
import * as d3 from "d3";

class HashtagDist extends Component {
  constructor(props) {
    super(props);
    this.drawHashtagDist = this.drawHashtagDist.bind(this);
  }

  componentDidMount() {
    this.drawHashtagDist();
  }

  componentDidUpdate(prevProps, prevState) {
    d3.selectAll(".hashtag_plot").remove().exit();

    this.drawHashtagDist();
  }

  drawHashtagDist() {
    const margin = { top: 20, right: 30, bottom: 40, left: 150 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const hashtag_value_counts = {};

    this.props.tweets.map((tweet) => {
      tweet.properties.hashtags.map((hashtag) => {
        if (hashtag in hashtag_value_counts) {
          hashtag_value_counts[hashtag] += 1;
        } else {
          hashtag_value_counts[hashtag] = 1;
        }
      });
    });

    const data = Object.entries(hashtag_value_counts);

    const chart_svg = d3
      .select(".hashtag-dist")
      .append("svg")
      .attr("class", "hashtag_plot")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().domain([0, 50]).range([0, width]);

    chart_svg
      .append("g")
      .attr("transform", "translate(-10, 0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(data.map((d) => d[0]))
      .paddingInner(0.2);

    const colorScale = d3.scaleOrdinal([
      "#27aeef",
      "#ea5545",
      "#f46a9b",
      "#87bc45",
      "#ef9b20",
    ]);

    chart_svg.append("g").call(d3.axisLeft(y));

    chart_svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d[0]))
      .attr("width", (d) => x(d[1]))
      .attr("height", y.bandwidth())
      .attr("fill", (d) => colorScale(d));
  }

  render() {
    return <div></div>;
  }
}

export default HashtagDist;
