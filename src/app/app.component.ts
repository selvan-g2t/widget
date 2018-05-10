import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import { Compiler,QueryList,TemplateRef, Component, Injector, ReflectiveInjector, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'widget loading';
  href = 'https://raw.githubusercontent.com/selvan-g2t/system/master/src/app/some-module/test.js';

  dates: any[] = ['dates'];
  chartData: any = {
    dataAvailable: true,
    total: 100,
    xData: this.dates,
    yData: ['used', 10, 20, 30, 20, 30, 10, 14, 20, 25, 68, 54, 56, 78, 56, 67, 88, 76, 65, 87, 76]
  };
  config: any = {
    chartId: 'exampleSparkline',
    chartHeight: 60,
    tooltipType: 'default'
  };

  @ViewChild("pluginHost", {read: ViewContainerRef}) pluginHost: ViewContainerRef;

  private injector: Injector;
  private compiler: Compiler;
  modalRef: BsModalRef;

  constructor(injector: Injector, 
    private _vcr: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: BsModalService
) 
    {
    this.injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
    this.compiler = this.injector.get(Compiler);

    let today = new Date();
    for (let d = 20 - 1; d >= 0; d--) {
      this.dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
    }
  }
  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);
  }

  widgetList = [
    {
        "instanceId": 1499911421569,
        "moduleName":"SparkModule",
        "compoentName":"spark",
        "widgetId":"new-3",
        "widgetName":"spark chart",
        "url":"https://raw.githubusercontent.com/selvan-g2t/system/master/src/app/some-module/spark.js"
    },
    {
        "instanceId": 1499911231569,
        "moduleName":"ChartsModule",
        "compoentName":"chart",
        "widgetId":"new-3",
        "widgetName":"Donut chart",
        "url":"https://raw.githubusercontent.com/selvan-g2t/system/master/src/app/some-module/chart.js"
      }
  ]

  loadWidget(widget){
    this.modalRef.hide();
        // remove instance representation from model

            for (let j = 0; j<this.initData.rows.length; j++) {
                let row = this.initData.rows[j]
                if (row.columns) {
                    for (let i = 0 ;i<row.columns.length; i++) {
                        let gadgets:any = row.columns[i].gadgets;
                        if(gadgets.length ==0){
                            gadgets.push(widget)
                            return;
                        }
                        
                    }
                }
            }


    
        
  }

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

  removeWidgets(widget){
              // remove instance representation from model
              this.initData.rows.forEach(function (row) {
                row.columns.forEach(function (column) {
                    if (column.gadgets) {
                        for (let i = column.gadgets.length - 1; i >= 0; i--) {
    
                            if (column.gadgets[i].instanceId === widget.instanceId) {
    
                                column.gadgets.splice(i, 1);
    
                                break;
                            }
                        }
                    }
                });
            });
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
                    "styleClass": "col-md-6"
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
                    "styleClass": "col-md-6"
                },
                {
                    "gadgets": [ {
                        "instanceId": 1423423231569,
                        "moduleName":"ChartsModule",
                        "compoentName":"chart",
                        "widgetId":"new-3",
                        "widgetName":"Donut chart",
                        "url":"https://raw.githubusercontent.com/selvan-g2t/system/master/src/app/some-module/chart.js"
                      }],
                    "styleClass": "col-md-6"
                }
            ]
        },
        {
            "columns":[
                
                {
                    "gadgets": [
                       
                        

                ],
                    "styleClass": "col-md-6"
                }
            ]
        }
    ],
    "structure": "3-6-3",
    "title": "Board Sample 1"
};

}
