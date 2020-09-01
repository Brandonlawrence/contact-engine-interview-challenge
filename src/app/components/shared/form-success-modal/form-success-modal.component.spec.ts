import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormSuccessModalComponent} from './form-success-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {AngularMaterialModule} from '../../../modules/angular-material/angular-material.module';

describe('FormSuccessModalComponent', () => {
  let component: FormSuccessModalComponent;
  let fixture: ComponentFixture<FormSuccessModalComponent>;
  let closeAllSpy;
  const model: any = {icon: 'check_circle_outline', dialogText: 'SMS Provider Saved', buttonText: 'Go Back'};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSuccessModalComponent],
      imports: [MatDialogModule, AngularMaterialModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: model}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.data).toEqual(model);
    });
  });
  describe('closeDialog()', () => {
    it('should call the closeAll method', () => {
      closeAllSpy = spyOn(component.modalRef, 'closeAll');
      component.closeDialog();
      expect(closeAllSpy).toHaveBeenCalled();
    });
  });
});
