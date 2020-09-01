import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {dummyToken} from '../models/dummy-token';
import {Observable, Subject} from 'rxjs';
import {SmsProvider} from '../models/interfaces/sms';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  endPoint = 'http://localhost:53897/api/SmsProviders';
  constructor(private httpClient: HttpClient) {
  }

  getSmsCountries(): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'bearer ' + dummyToken);
    const countiesEndpoint = this.endPoint + '/Countries';
    return this.httpClient.get(countiesEndpoint, {headers});
  }

  getSmsProviders(): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'bearer ' + dummyToken);
    return this.httpClient.get(this.endPoint, {headers});
  }

  postNewEntry(smsProvider: SmsProvider) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'bearer ' + dummyToken);
    return this.httpClient.post(this.endPoint, smsProvider, {headers});
  }
}
