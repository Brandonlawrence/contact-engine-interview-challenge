import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsComponent} from './components/forms/forms.component';


const routes: Routes = [{path: '', redirectTo: 'sms-form', pathMatch: 'full'},
  {path: 'sms-form', component: FormsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
