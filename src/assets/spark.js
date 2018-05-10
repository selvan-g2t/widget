"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
//our root app component
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var patternfly_ng_1 = require("patternfly-ng");
var SparkComponents = /** @class */ (function () {
    function SparkComponents() {
        this.dates = ['dates'];
        this.chartData = {
            dataAvailable: true,
            total: 100,
            xData: this.dates,
            yData: ['used', 10, 20, 30, 20, 30, 10, 14, 20, 25, 68, 54, 56, 78, 56, 67, 88, 76, 65, 87, 76]
        };
        this.config = {
            chartId: 'exampleSparkline',
            chartHeight: 90,
            tooltipType: 'default'
        };
    }
    SparkComponents.prototype.ngOnInit = function () {
        var today = new Date();
        for (var d = 20 - 1; d >= 0; d--) {
            this.dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
        }
    };
    SparkComponents = __decorate([
        core_1.Component({
            selector: 'spark',
            template: "\n    <div>\n    <pfng-chart-sparkline [chartData]=\"chartData\" [config]=\"config\"></pfng-chart-sparkline>\n    </div>\n  "
        })
    ], SparkComponents);
    return SparkComponents;
}());
exports.SparkComponents = SparkComponents;
var SparkModule = /** @class */ (function () {
    function SparkModule() {
    }
    SparkModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, patternfly_ng_1.ChartModule],
            declarations: [SparkComponents],
            bootstrap: [SparkComponents],
            entryComponents: [SparkComponents]
        })
    ], SparkModule);
    return SparkModule;
}());
exports.SparkModule = SparkModule;
