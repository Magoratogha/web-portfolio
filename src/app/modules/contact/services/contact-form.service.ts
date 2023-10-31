import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactRequest } from '../../../models';
import { EMAIL_SEND_ENDPOINT, EMAIL_SUBJECT } from '../../../constants';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public sendEmail({ name, email, message }: ContactRequest): Promise<any> {
    const requestParams = {
      name,
      subject: EMAIL_SUBJECT,
      email,
      message,
    };
    return lastValueFrom(
      this.http.post(EMAIL_SEND_ENDPOINT, requestParams, {
        headers: this.headers,
      })
    );
  }
}
