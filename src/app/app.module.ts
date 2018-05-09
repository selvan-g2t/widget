import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DndModule} from 'ng2-dnd';
import { AppComponent } from './app.component';
import { DclWrapper } from './wrapper';
@NgModule({
  declarations: [
    DclWrapper,
    AppComponent
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
