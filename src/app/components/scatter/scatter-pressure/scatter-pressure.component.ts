import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter-pressure',
  templateUrl: './scatter-pressure.component.html',
  styleUrls: ['./scatter-pressure.component.css']
})
export class ScatterPressureComponent implements OnInit {

  private svg: d3.Selection<SVGElement, {}, HTMLElement, any>;
  private margin: number;
  private height: number;
  private width: number;
  private date: string;

  constructor() {
    this.margin = 60;
    this.width = 750 - (this.margin);
    this.height = 400 - (this.margin);
  }

  ngOnInit(): void {

    this.createSvg();

    // Loads csv and gets the data to draw scatter graph
    d3.csv("assets/data.csv").then(data => {

      // Gets date to display in the graph
      this.date = data[0].Time.split(" ")[0];

      // Preprocess the time field
      data.forEach(d => {
        d.Time = d.Time.split(" ")[1].slice(0, 2);
      })

      this.drawScatter(data);
    });
  }

  // Converts & returns time in 24hr format string to 12hr format string
  private convertFrom24To12Format(time24: string): string {
    const sHours: string = time24.split(":")[0];
    const period: string = +sHours < 12 ? 'AM' : 'PM';
    const hours: number = +sHours % 12 || 12;

    return `${hours}${period}`;
  }

  // Creates an svg element for hour vs pressure
  private createSvg(): void {
    this.svg = d3.select("figure#scatter-pressure")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  // Draws scatter (xy) plot using the svg element created for hour vs pressure
  private drawScatter(data: d3.DSVRowArray<string>): void {

    // Adds X-axis
    const x: d3.ScalePoint<string> = d3.scalePoint()
      .domain(data.map(d => d.Time))
      .range([0, this.width])
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x).tickFormat(d => this.convertFrom24To12Format(d)))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")

    // Adds Y-axis
    const y: d3.ScaleLinear<number, number, never> = d3.scaleLinear()
      .domain([+d3.min(data.map(d => d.pressure)) - 3, +d3.max(data.map(d => d.pressure)) + 3])
      .range([this.height, 0])
    this.svg.append('g')
      .call(d3.axisLeft(y))

    // Adds dots
    this.svg.selectAll('circle')
      .data(data).enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', d => x(d.Time))
      .attr('cy', d => y(+d.pressure))
      .attr('r', 4)
      .style('fill', '#0077b6')
      .style('stroke', '#11141C')
      .style('stroke-width', 1)

    // Adds X-axis title
    this.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", this.width / 2)
      .attr("y", this.height + this.margin)
      .text("Hour")
      .style('fill', 'white');

    // Adds Y-axis title
    this.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin * 0.60)
      .attr("x", -this.height * 0.5)
      .text("Pressure")
      .style('fill', 'white');

    // Adds date to the graph
    this.svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", this.width / 2)
      .text(this.date)
      .style('fill', 'white');
  }

}
