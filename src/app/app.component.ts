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
                      "widgetId":"new-1",
                      "widgetName":"widget 1",
                      "url":"https://raw.githubusercontent.com/selvan-g2t/system/master/src/app/some-module/new.js"
                    }],
                    "styleClass": "col-md-3"
                },
                {
                    "gadgets": [
                        {
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
                    "gadgets": [],
                    "styleClass": "col-md-3"
                }
            ]
        }
    ],
    "structure": "3-6-3",
    "title": "Board Sample 1"
};

}
