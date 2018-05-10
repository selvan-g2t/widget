import {QueryList, Injector, ReflectiveInjector, NgModule, Component, Compiler, ViewContainerRef, ViewChild, Input, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core'


import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as patternflyNg from 'patternfly-ng';

import { COMPILER_PROVIDERS } from '@angular/compiler';



// Helper component to add dynamic components
@Component({
  selector: 'dcl-wrapper',
  template: `<div #target></div>`
})
export class DclWrapper {
  @ViewChild('target', { read: ViewContainerRef }) target;
  href = 'https://raw.githubusercontent.com/selvan-g2t/system/master/src/app/some-module/test.js';
  private injector: Injector;
  private compiler: Compiler;
  @Input() type;
  cmpRef: ComponentRef<any>;
  private isViewInitialized: boolean = false;

  constructor(injector: Injector, private _vcr: ViewContainerRef,private componentFactoryResolver: ComponentFactoryResolver,private cdRef: ChangeDetectorRef) { 
    this.injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
    this.compiler = this.injector.get(Compiler);
  }

  updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }


    fetch(this.type.url)
    .then(response => response.text())
    .then(source => {
      const exports = {}; // this will hold module exports
      const modules = {   // this is the list of modules accessible by plugin
        '@angular/core': AngularCore,
        '@angular/common': AngularCommon,
        'patternfly-ng':patternflyNg
        
      };
      const require = (module) => modules[module]; // shim 'require'
      eval(source); // interpret the plugin source
      const mwcf = this.compiler.compileModuleAndAllComponentsSync(exports[this.type.moduleName]);
      const getModule = mwcf.componentFactories.find(e => e.selector === this.type.compoentName);
      const viewContainerRef = this.target;
      viewContainerRef.clear();
      this.cmpRef = viewContainerRef.createComponent(getModule);
      this.cmpRef.instance.data = 'Some Data';
      this.cdRef.detectChanges();
    });





/*     if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
    this.cmpRef = this.target.createComponent(factory)
    // to access the created instance use
    // this.compRef.instance.someProperty = 'someValue';
    // this.compRef.instance.someOutput.subscribe(val => doSomething());
    this.cdRef.detectChanges(); */
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}