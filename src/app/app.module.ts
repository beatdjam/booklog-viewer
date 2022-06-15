import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from "../environments/environment";
import {AkitaNgDevtools} from "@datorama/akita-ngdevtools";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadFormComponent} from './ui/file-upload-form/file-upload-form.component';
import {StatusCountComponent} from './feature/status-count/status-count.component';
import {NgChartsModule} from "ng2-charts";
import {StatsGraphComponent} from './feature/stats-graph/stats-graph.component';
import {TableComponent} from './feature/table/table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DatePickerComponent} from './ui/date-picker/date-picker.component';

@NgModule({
    declarations: [
        AppComponent,
        FileUploadFormComponent,
        StatusCountComponent,
        StatsGraphComponent,
        TableComponent,
        DatePickerComponent
    ],
    imports: [
        environment.production ? [] : AkitaNgDevtools.forRoot(),
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgChartsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
