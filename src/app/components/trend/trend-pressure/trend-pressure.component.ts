import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-trend-pressure',
  templateUrl: './trend-pressure.component.html',
  styleUrls: ['./trend-pressure.component.css']
})
export class TrendPressureComponent implements OnInit {

  private svg;
  private margin;
  private height;
  private width;

  private date;

  constructor() {
    this.margin = 60;
    this.width = 750 - (this.margin);
    this.height = 400 - (this.margin);
  }

  ngOnInit(): void {
    this.createSvg();
    d3.csv("assets/data.csv").then(data => {
      this.date = data[0].Time.split(" ")[0];
      data.forEach(d => {
        d.Time = this.convertFrom24To12Format(d.Time.split(" ")[1]);
      })
      this.drawTrend(data);
    });
  }

  private convertFrom24To12Format(time24) {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;

    return `${hours}${period}`;
  }

  private createSvg(): void {
    this.svg = d3.select("figure#trend-pressure")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawTrend(data: any[]): void {
    const x = d3.scaleBand()
      .domain(data.map(d => d.Time))
      .range([0, this.width])

    const y = d3.scaleLinear()
      .domain([d3.min(data.map(d => d.pressure)) - 20, d3.max(data.map(d => d.pressure)) + 20])
      .range([this.height, 0])

    const line = d3.line()
      .x(d => x(d['Time']))
      .y(d => y(d['pressure']))

    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")

    this.svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(y))

    this.svg.append('path')
      .datum(data)
      .attr('class', 'data-line')
      .style('stroke', '#0077b6')
      .style('stroke-width', 3)
      .style('fill', "none")
      .attr('d', line)

    this.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", this.width / 2)
      .attr("y", this.height + this.margin)
      .text("Hour")
      .style('fill', 'white');

    this.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin * 0.60)
      .attr("x", -this.height * 0.5)
      .text("Pressure")
      .style('fill', 'white');

    this.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", this.width / 2)
      .text(this.date)
      .style('fill', 'white');
  }

}
