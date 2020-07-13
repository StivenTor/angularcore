import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "./material.module";

import {
  MatProgressBarModule,
  MatPaginatorIntl,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE} from "@angular/material";
import { MatListModule} from "@angular/material/list";
import { MatCardModule } from "@angular/material";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientService } from "./services/infraestructure/http-client.service";
import { AlertService } from "./services/infraestructure/alert.service";
import { FormValidatorService } from "./services/infraestructure/form-validator.service";

import { PersonService } from "./services/person.service";
import { PersonRemoteService } from "./services/remote/person-remote.service";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatListModule,
    MatCardModule
  ],
  providers: [
	HttpClientService,
    AlertService,
    FormValidatorService,
    PersonRemoteService,
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
