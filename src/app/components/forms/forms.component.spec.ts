import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsComponent} from './forms.component';
import {SmsService} from '../../services/sms.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormSuccessModalComponent} from '../shared/form-success-modal/form-success-modal.component';
import {AngularMaterialModule} from '../../modules/angular-material/angular-material.module';
import {of} from 'rxjs';
import {SmsProvider} from '../../models/interfaces/sms';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;
  let dialogOpenSpy;
  let snackbarOpenSpy;
  let getCountriesSpy;
  let postNewEntrySpy;
  let smsService: SmsService;
  let subscriptionListSpy;
  const smsMockService = {
    getSmsCountries: () => {
      return {};
    },
    postNewEntry: () => {
      return {};
    }
  };
  const dialogObject = jasmine.createSpyObj({afterClosed: of({}), close: null});
  dialogObject.componentInstance = {body: 'FormSuccessModalComponent'};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormsComponent],
      imports: [HttpClientTestingModule, AngularMaterialModule],
      providers: [{provide: SmsService, useValue: smsMockService}, MatSnackBar, MatDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    smsService = fixture.debugElement.injector.get(SmsService);

    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('getCountries()', () => {
    it('should call smsService getSmsCountries method', () => {
      getCountriesSpy = spyOn(smsMockService, 'getSmsCountries').and.returnValue({
        subscribe: () => {
        }
      });
      component.getCountries(true);
      expect(getCountriesSpy).toHaveBeenCalled();
    });
  });

  describe('postNewEntry()', () => {
    it('should call smsService postNewEntry method', () => {
      const smsProvider: SmsProvider = {
        country_id: 1,
        name: 'Test Provider',
        originating_number: '44723827328'
      };
      postNewEntrySpy = spyOn(smsMockService, 'postNewEntry').and.returnValue({
        subscribe: () => {
        }
      });
      component.postNewEntry(smsProvider);
      expect(postNewEntrySpy).toHaveBeenCalled();
    });
  });

  describe('showSuccessDialog()', () => {
    it('should call dialog open method and set resetForm to true when called', () => {
      dialogOpenSpy = spyOn(component.dialog, 'open').and.returnValue(dialogObject);
      const dialogData = {
        height: '350px',
        width: '450px',
        panelClass: 'form-success-dialog',
        data: {icon: 'check_circle_outline', dialogText: 'SMS Provider Saved', buttonText: 'Go Back'}
      };
      component.showSuccessDialog();
      expect(dialogOpenSpy).toHaveBeenCalledWith(FormSuccessModalComponent, dialogData);
      expect(component.resetForm).toBeTruthy();
    });
  });

  describe('openSnackbar()', () => {
    it('should call snackbar open method with required parameters', () => {
      snackbarOpenSpy = spyOn(component.snackBar, 'open');
      const errorMessage = 'Test Error Message';
      const config = {
        duration: 5000
      };
      component.openSnackBar(errorMessage);
      expect(snackbarOpenSpy).toHaveBeenCalledWith(errorMessage, null, config);
    });
  });
  describe('ngOnDestroy()', () => {
    it('should call unsubscribe subscriptionList method', () => {
      subscriptionListSpy = spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(subscriptionListSpy).toHaveBeenCalled();
    });
  });
});
