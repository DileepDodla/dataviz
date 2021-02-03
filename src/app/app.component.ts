import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Data-Visualizer';
  show(x) { console.log(x.control.value); }
  viewCSV() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/data.csv');
    xhr.setRequestHeader('Content-Type', 'text/csv');
    xhr.send();
  }
}
