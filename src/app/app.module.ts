import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomFormsModule} from './components/forms/custom-forms.module';
import {HttpClientModule} from '@angular/common/http';
import { FormSuccessModalComponent } from './components/shared/form-success-modal/form-success-modal.component';
import {AngularMaterialModule} from './modules/angular-material/angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    FormSuccessModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    CustomFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
