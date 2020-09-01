import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../../models/interfaces/country';
import {SmsProvider} from '../../../models/interfaces/sms';
import {sharedStrings} from '../../../models/strings/shared-strings';

@Component({
  selector: 'app-sms-post-form',
  templateUrl: './sms-post-form.component.html',
  styleUrls: ['./sms-post-form.component.scss']
})
export class SmsPostFormComponent implements OnInit, OnChanges {
  @Input() countries: Array<Country>;
  @Input() resetForm: boolean;
  @Input() pendingRequest: boolean;
  @Output() callGetCountries = new EventEmitter<boolean>();
  @Output() postSms = new EventEmitter<SmsProvider>();
  smsForm: FormGroup;
  strings = sharedStrings;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getCountries();
    this.setForm();
  }

  ngOnChanges(): void {
    this.defaultForm();
  }

  postSmsProviders(): void {
    const smsProvider: SmsProvider = {
      country_id: this.smsForm.value.countriesField,
      name: this.smsForm.value.smsProviderField,
      originating_number: '44723827328'
    };
    this.postSms.emit(smsProvider);
  }

  setForm(): void {
    this.smsForm = this.formBuilder.group({
      smsProviderField: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      countriesField: ['', Validators.required]
    });
  }

  getCountries(): void {
    this.callGetCountries.emit(true);
  }

  private defaultForm(): void {
    if (this.resetForm) {
      this.smsForm.reset();
    }
  }
}

