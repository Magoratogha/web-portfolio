import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private headers: HttpHeaders = new HttpHeaders();
  private readonly emailServiceEndpoint =
    'https://sendmail-rw2hwhriua-uc.a.run.app/';

  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
  }

  public sendEmail(formValue: Contact): Promise<any> {
    const requestParams = {
      name: formValue.name,
      subject: 'Contact from Web Portfolio',
      email: formValue.email,
      message: formValue.message,
    };
    return this.http
      .post(this.emailServiceEndpoint, requestParams, { headers: this.headers })
      .toPromise();
  }
}
