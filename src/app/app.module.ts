import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarTemperatureComponent } from './components/bar/bar-temperature/bar-temperature.component';
import { BarPressureComponent } from './components/bar/bar-pressure/bar-pressure.component';
import { TableComponent } from './components/table/table.component';
import { TrendTemperatureComponent } from './components/trend/trend-temperature/trend-temperature.component';
import { TrendPressureComponent } from './components/trend/trend-pressure/trend-pressure.component';
import { ScatterTemperatureComponent } from './components/scatter/scatter-temperature/scatter-temperature.component';
import { ScatterPressureComponent } from './components/scatter/scatter-pressure/scatter-pressure.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BarTemperatureComponent,
    BarPressureComponent,
    TableComponent,
    TrendTemperatureComponent,
    TrendPressureComponent,
    ScatterTemperatureComponent,
    ScatterPressureComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
