import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy',
  template: '<h1>2312312</h1>'
})
export class LazyComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [LazyComponent],
  entryComponents: [LazyComponent]
})
export class LazyModule {
}
