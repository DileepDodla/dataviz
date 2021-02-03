import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    d3.csv("assets/data.csv").then(data => {
      let table = d3.select(".table")
      table.append("thead")
        .append("tr")
        .selectAll("th")
        .data(d3.csvParseRows(d3.csvFormat(data))[0]).enter()
        .append("th")
        .text(function (d) { return d.charAt(0).toUpperCase() + d.slice(1); });
      table.append("tbody")
        .selectAll("tr")
        .data(d3.csvParseRows(d3.csvFormat(data)).slice(1)).enter()
        .append("tr")
        .selectAll("td")
        .data(function (d) { return d; }).enter()
        .append("td")
        .text(function (d) { return d; });
    })
  }
}
