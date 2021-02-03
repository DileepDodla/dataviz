import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  private table: d3.Selection<SVGElement, {}, HTMLElement, any>;

  ngOnInit(): void {

    // Selects table element
    this.table = d3.select(".table");

    // Loads csv and gets the data to generate table content
    d3.csv("assets/data.csv").then(data => {
      const headerRow: string[] = d3.csvParseRows(d3.csvFormat(data))[0];
      const dataRows: string[][] = d3.csvParseRows(d3.csvFormat(data)).slice(1);
      this.generateTable(headerRow, dataRows);
    })
  }

  // Generates table with given data
  private generateTable(headerRow: string[], dataRows: string[][]): void {

    // Adds header content (column names) to the table
    this.table.append("thead")
      .append("tr")
      .selectAll("th")
      .data(headerRow).enter()
      .append("th")
      .text((d: string) => d.charAt(0).toUpperCase() + d.slice(1));

    // Adds body content (column values) to the table
    this.table.append("tbody")
      .selectAll("tr")
      .data(dataRows).enter()
      .append("tr")
      .selectAll("td")
      .data((d: string[]) => d).enter()
      .append("td")
      .text((d: string) => d);
  }
}
