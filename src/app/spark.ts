//our root app component
import {Component,OnInit, NgModule, VERSION} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'patternfly-ng';

@Component({
  selector: 'spark',
  template: `
    <div>
    <pfng-chart-sparkline [chartData]="chartData" [config]="config"></pfng-chart-sparkline>
    </div>
  `,
})
export class SparkComponents implements OnInit{
  dates: any[] = ['dates'];
  chartData: any = {
    dataAvailable: true,
    total: 100,
    xData: this.dates,
    yData: ['used', 10, 20, 30, 20, 30, 10, 14, 20, 25, 68, 54, 56, 78, 56, 67, 88, 76, 65, 87, 76]
  };
  config: any = {
    chartId: 'exampleSparkline',
    chartHeight: 90,
    tooltipType: 'default'
  };
  constructor() {
  }
  ngOnInit(): void {
    let today = new Date();
    for (let d = 20 - 1; d >= 0; d--) {
      this.dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
    }
  }

}


@NgModule({
  imports: [ CommonModule,ChartModule ],
  declarations: [ SparkComponents ],
  bootstrap: [ SparkComponents ],
  entryComponents: [SparkComponents]
})
export class SparkModule {}