import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import { Compiler,QueryList, Component, Injector, ReflectiveInjector, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'widget loading';
  href = 'https://raw.githubusercontent.com/selvan-g2t/system/master/src/app/some-module/test.js';


  @ViewChild("pluginHost", {read: ViewContainerRef}) pluginHost: ViewContainerRef;

  private injector: Injector;
  private compiler: Compiler;

  constructor(injector: Injector, private _vcr: ViewContainerRef,private componentFactoryResolver: ComponentFactoryResolver) {
    this.injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
    this.compiler = this.injector.get(Compiler);
  }

  chartData: any[] = [
    ['Cats', 2],
    ['Hamsters', 1],
    ['Fish', 3],
    ['Dogs', 2]
  ];

  largeConfig: any = {
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

  load() {
    fetch(this.href)
      .then(response => response.text())
      .then(source => {
        const exports = {}; // this will hold module exports
        const modules = {   // this is the list of modules accessible by plugin
          '@angular/core': AngularCore,
          '@angular/common': AngularCommon
        };

        const require = (module) => modules[module]; // shim 'require'
        eval(source); // interpret the plugin source
        const mwcf = this.compiler.compileModuleAndAllComponentsSync(exports['TestingModule']);
        const getModule = mwcf.componentFactories.find(e => e.selector === 'testing');
        console.log(this.pluginHost)
        const viewContainerRef = this.pluginHost;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(getModule);
        componentRef.instance.data = 'Some Data';

      });
  }
  transferData: Object = {id: 1, msg: 'Hello'};
  receivedData: Array<any> = [];

  transferDataSuccess($event: any, where) {
    console.log($event)
    console.log(where)
    
        // remove instance representation from model
        this.initData.rows.forEach(function (row) {
            row.columns.forEach(function (column) {
                if (column.gadgets) {
                    for (let i = column.gadgets.length - 1; i >= 0; i--) {

                        if (column.gadgets[i].instanceId === $event.dragData.instanceId) {

                            column.gadgets.splice(i, 1);

                            break;
                        }
                    }
                }
            });
        });

    where.gadgets.push($event.dragData)
    console.log(this.initData)
   //   this.receivedData.push($event);
  }

  initData = {
    "boardInstanceId": 1,
    "id": 9,
    "rows": [
        {
            "columns": [
                {
                    "gadgets": [{
                        "moduleName":"TestingModule",
                        "compoentName":"testing",
                      "widgetId":"new-1",
                      "instanceId": 1499912903549,
                      "widgetName":"widget 1",
                      "url":"https://raw.githubusercontent.com/selvan-g2t/system/master/src/app/some-module/new.js"
                    }],
                    "styleClass": "col-xs-6"
                },
                {
                    "gadgets": [
                        {
                            "moduleName":"TestingModule",
                        "compoentName":"testing",
                          "widgetId":"test-1",
                          "widgetName":"widget 2",
                          "url":"https://raw.githubusercontent.com/selvan-g2t/system/master/src/app/some-module/test.js",
                            "componentType": "TrendGadgetComponent",
                            "config": {
                                "propertyPages": [
                                    {
                                        "displayName": "Run",
                                        "groupId": "run",
                                        "position": 10,
                                        "properties": [
                                            {
                                                "controlType": "dynamicdropdown",
                                                "key": "endpoint",
                                                "label": "API Endpoints",
                                                "order": 2,
                                                "required": false,
                                                "value": "Devappliance - ECX"
                                            },
                                            {
                                                "controlType": "textbox",
                                                "key": "title",
                                                "label": "Title",
                                                "order": 1,
                                                "required": false,
                                                "value": "Trend"
                                            },
                                            {
                                                "controlType": "hidden",
                                                "key": "instanceId",
                                                "order": -1,
                                                "required": false,
                                                "value": 2
                                            }
                                        ]
                                    },
                                    {
                                        "displayName": "Chart",
                                        "groupId": "chart",
                                        "position": 11,
                                        "properties": [
                                            {
                                                "controlType": "checkbox",
                                                "key": "chart_properties",
                                                "label": "Show chart details",
                                                "order": 3,
                                                "required": false,
                                                "value": true
                                            }
                                        ]
                                    }
                                ]
                            },
                            "description": "General trends.",
                            "icon": "images/trend.png",
                            "instanceId": 1499912901569,
                            "name": "Trend",
                            "tags": [
                                {
                                    "facet": "Performance",
                                    "name": "trend"
                                },
                                {
                                    "facet": "Chart",
                                    "name": "area"
                                }
                            ]
                        }
                    ],
                    "styleClass": "col-xs-6"
                },
                {
                    "gadgets": [{
                        "instanceId": 1499911231569,
                        "moduleName":"ChartsModule",
                        "compoentName":"chart",
                        "widgetId":"new-3",
                        "widgetName":"widget 3",
                        "url":"../assets/chart.js"
                      }],
                    "styleClass": "col-xs-6"
                }
            ]
        }
    ],
    "structure": "3-6-3",
    "title": "Board Sample 1"
};

}
