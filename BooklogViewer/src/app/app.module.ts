import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import {AkitaNgDevtools} from "@datorama/akita-ngdevtools";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
