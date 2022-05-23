import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from "../environments/environment";
import {AkitaNgDevtools} from "@datorama/akita-ngdevtools";
import {ReactiveFormsModule} from "@angular/forms";
import { FileUploadFormComponent } from './feature/file-upload-form/file-upload-form.component';
import { StatusCountComponent } from './feature/status-count/status-count.component';
import {NgChartsModule} from "ng2-charts";
import { StatsGraphComponent } from './feature/stats-graph/stats-graph.component';
import { TableComponent } from './feature/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadFormComponent,
    StatusCountComponent,
    StatsGraphComponent,
    TableComponent
  ],
  imports: [
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
