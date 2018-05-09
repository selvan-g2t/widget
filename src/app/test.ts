//our root app component
import {Component, NgModule, VERSION} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'testing',
  template: `
    <div>
      <h2>Hello {{name}} <button (click)="getData()">get</button></h2>
    </div>
  `,
})
export class TestingComponents{
  name:string;
  constructor() {
    this.name = `Angular! v${VERSION.full}`
  }
  getData(){
    this.name = 'done';
  }
}

const routes: Routes = [
  { path: '', redirectTo: 'one', pathMatch: 'full' },
  {
    path: 'one',
    component: TestingComponents
  }
];

@NgModule({
  imports: [ CommonModule,RouterModule.forChild(routes) ],
  declarations: [ TestingComponents ],
  bootstrap: [ TestingComponents ],
  entryComponents: [TestingComponents]
})
export class TestingModule {}