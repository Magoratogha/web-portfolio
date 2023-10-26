import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactRequest } from 'src/app/core/models';
import { BackgroundService } from 'src/app/core/services';
import { ContactFormService } from 'src/app/core/services/contact-form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public contactForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    message: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private bgService: BackgroundService,
    private emailService: ContactFormService
  ) {}

  ngOnInit(): void {
    this.bgService.setMiddleView2();
  }

  async sendEmail() {
    if (this.contactForm.valid) {
      try {
        await this.emailService.sendEmail(
          this.contactForm.value as ContactRequest
        );
        this.contactForm.reset();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
