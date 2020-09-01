import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SmsPostFormComponent} from './sms-post-form.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {SmsProvider} from '../../../models/interfaces/sms';
import {CustomFormsModule} from '../custom-forms.module';
import {countriesResponse} from '../../../models/unit-testing/mock-data';

describe('SmsPostFormComponent', () => {
  let component: SmsPostFormComponent;
  let fixture: ComponentFixture<SmsPostFormComponent>;
  let getCountriesSpy;
  let setFormSpy;
  let postSmsSpy;
  const smsFormBuilder: FormBuilder = new FormBuilder();
  let smsProviderField;
  let countriesField;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmsPostFormComponent],
      imports: [CustomFormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsPostFormComponent);
    component = fixture.componentInstance;
    getCountriesSpy = spyOn(component, 'getCountries');
    setFormSpy = spyOn(component, 'setForm');
    component.smsForm = smsFormBuilder.group({
      smsProviderField: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      countriesField: ['', Validators.required]
    });
    component.countries = countriesResponse.map(countryResponse => {
      return {name: countryResponse.displayName, id: countryResponse.id};
    });
    smsProviderField = component.smsForm.controls.smsProviderField;
    countriesField = component.smsForm.controls.countriesField;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should create and call getCountries/setForm', () => {
      expect(component).toBeTruthy();
      expect(getCountriesSpy).toHaveBeenCalled();
      expect(setFormSpy).toHaveBeenCalled();
    });
  });
  describe('form validation', () => {
    it('should set smsProvider field valid if populated', () => {
      smsProviderField.setValue('Test Provider');
      expect(smsProviderField.valid).toBeTruthy();
    });
    it('should set smsProvider field invalid if not populated', () => {
      smsProviderField.setValue('');
      expect(smsProviderField.valid).toBeFalsy();
    });
    it('should set smsProvider field invalid if a number or special character is entered', () => {
      smsProviderField.setValue('123');
      expect(smsProviderField.valid).toBeFalsy();
      smsProviderField.setValue('!???');
      expect(smsProviderField.valid).toBeFalsy();
    });
    it('should set countries field valid if populated', () => {
      expect(countriesField.disabled).toBeFalsy();
    });
    it('should set countries as valid if value is selected', () => {
      countriesField.setValue(1);
      expect(countriesField.valid).toBeTruthy();
    });
    it('should set countries as invalid if value is not selected', () => {
      expect(countriesField.valid).toBeFalsy();
    });
  });
  describe('postSmsProviders', () => {
    it('should call emit method with a sms provider', () => {
      postSmsSpy = spyOn(component.postSms, 'emit');
      component.smsForm.value.countriesField = '1';
      component.smsForm.value.smsProviderField = 'test';
      const smsProvider: SmsProvider = {
        country_id: component.smsForm.value.countriesField,
        name: component.smsForm.value.smsProviderField,
        originating_number: '44723827328'
      };
      component.postSmsProviders();
      expect(postSmsSpy).toHaveBeenCalledWith(smsProvider);
    });
  });
  describe('setForm', () => {
    it('should create and call getCountries/setForm', () => {
      component.setForm();
      expect(component.smsForm).toBeDefined();
    });
  });
});
