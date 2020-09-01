import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsComponent} from './forms.component';
import {SmsPostFormComponent} from './sms-post-form/sms-post-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from '../../modules/angular-material/angular-material.module';



@NgModule({
  declarations: [
    FormsComponent,
    SmsPostFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ]
})
export class CustomFormsModule { }
