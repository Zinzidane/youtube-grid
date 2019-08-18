import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxHeaderComponent } from './header/checkbox-header.component';
import { GridTableComponent } from './grid-table/grid-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxHeaderComponent,
    GridTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([
      CheckboxHeaderComponent
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
