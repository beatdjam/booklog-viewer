import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from "../environments/environment";
import {AkitaNgDevtools} from "@datorama/akita-ngdevtools";
import {ReactiveFormsModule} from "@angular/forms";
import { FileUploadFormComponent } from './file-upload-form/file-upload-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadFormComponent
  ],
  imports: [
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
