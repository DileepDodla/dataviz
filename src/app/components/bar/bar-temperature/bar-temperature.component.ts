import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-temperature',
  templateUrl: './bar-temperature.component.html',
  styleUrls: ['./bar-temperature.component.css']
})
export class BarTemperatureComponent implements OnInit {
  private svg;
  private margin = 60;
  private width = 750 - (this.margin);
  private height = 400 - (this.margin);
  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    d3.csv("assets/data.csv").then(data => {
      this.drawBars(data);
    });
  }

  private convertFrom24To12Format(time24) {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;

    return `${hours}${period}`;
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar-temperature")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => this.convertFrom24To12Format(d.Time.split(" ")[1])))
      .padding(0.4);

    // Draw the X-axis on the DOM
    const xaxis = this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));
    xaxis.selectAll("path").style("stroke", "white");
    xaxis.selectAll("line").style("stroke", "white");
    xaxis.selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style('fill', 'white');

    // Write X axis title:
    this.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", this.width / 2)
      .attr("y", this.height + this.margin)
      .text("Hour")
      .style('fill', 'white');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([d3.min(data.map(d => d.temperature)) - 5, d3.max(data.map(d => d.temperature)) + 5])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    let yaxis = this.svg.append("g")
      .call(d3.axisLeft(y));
    yaxis.selectAll("path")
      .style("stroke", "white");
    yaxis.selectAll("line")
      .style("stroke", "white");
    yaxis.selectAll("text")
      .style("text-anchor", "end")
      .style('fill', 'white');

    // Write Y axis title:
    this.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin * 0.60)
      .attr("x", -this.height * 0.5)
      .text("Temperature")
      .style('fill', 'white');

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(this.convertFrom24To12Format(d.Time.split(" ")[1])))
      .attr("y", d => y(d.temperature))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.temperature))
      .attr("fill", "#d04a35");

    // Date in graph
    this.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", this.width / 2)
      .text(data[0].Time.split(" ")[0])
      .style('fill', 'white');
  }
}
