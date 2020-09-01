import {Component, OnDestroy, OnInit} from '@angular/core';
import {SmsService} from '../../services/sms.service';
import {Subscription} from 'rxjs';
import {SmsProvider} from '../../models/interfaces/sms';
import {Country} from '../../models/interfaces/country';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {FormSuccessModalComponent} from '../shared/form-success-modal/form-success-modal.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy {
  countries: Array<Country> = [];
  resetForm: boolean;
  pendingRequest: boolean;
  subscription: Subscription = new Subscription();

  constructor(private smsService: SmsService, public snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  getCountries(callGetCountries: boolean): void {
    if (callGetCountries) {
      this.subscription.add(this.smsService.getSmsCountries().subscribe(smsCountries => {
        this.countries = Object.values(smsCountries).map(smsCountry => {
          return {name: smsCountry.displayName, id: smsCountry.id};
        });
      }, error => {
        this.openSnackBar('Server is down. Please launch your dotnet application.');
      }));
    }
  }

  postNewEntry(smsProvider: SmsProvider) {
    this.resetForm = false;
    this.pendingRequest = true;
    this.subscription.add(this.smsService.postNewEntry(smsProvider).subscribe(postResponse => {
        this.pendingRequest = false;
      },
      error => {
        this.openSnackBar(error.error);
        this.pendingRequest = false;
      },
      () => {
        this.showSuccessDialog();
      }));
  }

  showSuccessDialog(): void {
    const formSuccessDialog = this.dialog.open(FormSuccessModalComponent, {
      height: '350px',
      width: '450px',
      panelClass: 'form-success-dialog',
      data: {icon: 'check_circle_outline', dialogText: 'SMS Provider Saved', buttonText: 'Go Back'}
    });
    this.subscription.add(formSuccessDialog.afterClosed().subscribe(
      () => {
        this.resetForm = true;
      }
    ));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {duration: 5000});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
