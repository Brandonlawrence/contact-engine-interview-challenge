import {getTestBed, TestBed} from '@angular/core/testing';
import {SmsService} from './sms.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {countriesResponse, smsProviderResponse} from '../models/unit-testing/mock-data';

describe('SmsService', () => {
  let injector: TestBed;
  let service: SmsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmsService],
    });
    injector = getTestBed();
    service = injector.get(SmsService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  describe('ngOnInit()', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
  describe('getCountries()', () => {
    it('should make a get request to getSmsCountries', () => {
      const dummyUserListResponse = {
        data: countriesResponse
      };
      service.getSmsCountries().subscribe((res) => {
        expect(res).toEqual(dummyUserListResponse);
      });
      const req = httpMock.expectOne('http://localhost:53897/api/SmsProviders/Countries');
      expect(req.request.method).toBe('GET');
      req.flush(dummyUserListResponse);
    });
  });
  describe('getSmsProviders()', () => {
    it('should make a get request to getSmsProviders', () => {
      const dummyUserListResponse = {
        data: smsProviderResponse
      };
      service.getSmsProviders().subscribe((res) => {
        expect(res).toEqual(dummyUserListResponse);
      });
      const req = httpMock.expectOne('http://localhost:53897/api/SmsProviders');
      expect(req.request.method).toBe('GET');
      req.flush(dummyUserListResponse);
    });
  });
  describe('postEntry()', () => {
    it('should post a new sms provider entry', () => {
      const dummyUserListResponse = {
        data: {}
      };
      service.postNewEntry({country_id: 1, name: 'brandon', originating_number: '44723827328'}).subscribe((res) => {
        expect(res).toEqual(dummyUserListResponse);
      });
      const req = httpMock.expectOne('http://localhost:53897/api/SmsProviders');
      expect(req.request.method).toBe('POST');
      req.flush(dummyUserListResponse);
    });
  });
  it('should return an error message if two of the same smsProvider names are posted', () => {
    const dummyUserListResponse = {
      data: {}
    };
    const duplicatedProviderError = 'Provider already exists';
    service.postNewEntry({country_id: 1, name: 'Test', originating_number: '447238278'}).subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });
    const req = httpMock.expectOne('http://localhost:53897/api/SmsProviders');
    expect(req.request.method).toBe('POST');
    req.flush(dummyUserListResponse);
    service.postNewEntry({country_id: 1, name: 'Test', originating_number: '447238278'}).subscribe((res) => {
      expect(res).toEqual(duplicatedProviderError);
    });
    const req2 = httpMock.expectOne('http://localhost:53897/api/SmsProviders');
    expect(req2.request.method).toBe('POST');
    req2.flush(duplicatedProviderError);
  });
});
