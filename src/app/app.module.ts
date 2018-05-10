import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DndModule} from 'ng2-dnd';
import { AppComponent } from './app.component';
import { DclWrapper } from './wrapper';
import { ChartModule } from 'patternfly-ng';
import { ModalModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    DclWrapper,
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot(),
    ModalModule.forRoot(),
    ChartModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
