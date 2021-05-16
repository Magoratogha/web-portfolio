import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private headers: HttpHeaders = new HttpHeaders();
  private readonly emailServiceEndpoint = 'https://gray-charger.glitch.me/formulario';

  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
  }

  public sendEmail(formValue: Contact): Promise<any> {
    const requestParams = { nombre: formValue.name,
      asunto: 'Contact from Web Portfolio',
      email: formValue.email,
      mensaje: formValue.message
    };
    return this.http.post(this.emailServiceEndpoint, requestParams, { headers:
      this.headers }).toPromise();
  }
}
