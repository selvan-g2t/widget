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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var TestingComponents = /** @class */ (function () {
    function TestingComponents() {
        this.name = "Angular! v" + core_1.VERSION.full;
    }
    TestingComponents.prototype.getData = function () {
        this.name = 'done';
    };
    TestingComponents = __decorate([
        core_1.Component({
            selector: 'testing',
            template: "\n    <div>\n      <h2>Hello {{name}} <button (click)=\"getData()\">get</button></h2>\n    </div>\n  "
        })
    ], TestingComponents);
    return TestingComponents;
}());
exports.TestingComponents = TestingComponents;
var routes = [
    { path: '', redirectTo: 'one', pathMatch: 'full' },
    {
        path: 'one',
        component: TestingComponents
    }
];
var TestingModule = /** @class */ (function () {
    function TestingModule() {
    }
    TestingModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule.forChild(routes)],
            declarations: [TestingComponents],
            bootstrap: [TestingComponents],
            entryComponents: [TestingComponents]
        })
    ], TestingModule);
    return TestingModule;
}());
exports.TestingModule = TestingModule;
