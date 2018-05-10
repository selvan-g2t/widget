//our root app component
import {Component, NgModule, VERSION} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'patternfly-ng';

@Component({
  selector: 'chart',
  template: `
    <div>
    <pfng-chart-donut [chartData]="chartData" [config]="largeConfig"></pfng-chart-donut>
    </div>
  `,
})
export class ChartsComponents{
  name:string;
  chartData: any[] = [];
  largeConfig:any;
  constructor() {
    this.chartData = [
      ['Cats', 2],
      ['Hamsters', 1],
      ['Fish', 3],
      ['Dogs', 2]
    ];

    this.largeConfig = {
      chartId: 'exampleDonut',
      colors: {
        Cats: '#0088ce',     // blue
        Hamsters: '#3f9c35', // green
        Fish: '#ec7a08',     // orange
        Dogs: '#cc0000'      // red
      },
      data: {
        onclick: (data: any, element: any) => {
          alert('You clicked on donut arc: ' + data.id);
        }
      },
      donut: {
        title: 'Animals'
      },
      legend: {
        show: true
      }
    };

  }

}


@NgModule({
  imports: [ CommonModule,ChartModule ],
  declarations: [ ChartsComponents ],
  bootstrap: [ ChartsComponents ],
  entryComponents: [ChartsComponents]
})
export class ChartsModule {}