import React, { Component } from "react";
import * as d3 from "d3";

class CategoryDist extends Component {
  constructor(props) {
    super(props);
    this.drawCategoryDist = this.drawCategoryDist.bind(this);
  }

  componentDidMount() {
    this.drawCategoryDist();
  }

  componentDidUpdate(prevProps, prevState) {
    d3.selectAll(".category_plot").remove().exit();

    this.drawCategoryDist();
  }

  drawCategoryDist() {
    const margin = { top: 20, right: 30, bottom: 40, left: 150 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const category_value_counts = {
      "Relief Request and Donations": 0,
      Casualty: 0,
      "Sympathy and Support": 0,
      "Caution and Advice": 0,
      "Damage Report": 0,
    };

    // console.log(this.props);
    // console.log(this.props.tweets);

    this.props.tweets.map((tweet) => {
      category_value_counts[tweet.properties.category] += 1;
    });

    const data = Object.entries(category_value_counts);

    // console.log(data);

    const chart_svg = d3
      .select(".category-dist")
      .append("svg")
      .attr("class", "category_plot")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);

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
    // .range([15, 40, 50])
    // .domain(["#27aeef", "#ea5545", "#f46a9b", "#87bc45", "#ef9b20"]);

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

export default CategoryDist;
