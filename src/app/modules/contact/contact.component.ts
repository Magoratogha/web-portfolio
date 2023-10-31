import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FACEBOOK_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  IS_SMALL_MOBILE_DEVICE,
  LINKEDIN_URL,
} from 'src/app/constants';
import { EmailSendingStatus } from 'src/app/enums';
import { ContactRequest } from 'src/app/models';
import { BackgroundService } from '../../modules/core/services';
import { ContactFormService } from './services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public sendingStatus: EmailSendingStatus = EmailSendingStatus.NotSent;
  public contactForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    message: new FormControl<string>('', [Validators.required]),
  });
  EmailSendingStatus = EmailSendingStatus;
  IS_SMALL_MOBILE_DEVICE = IS_SMALL_MOBILE_DEVICE;
  GITHUB_URL = GITHUB_URL;
  LINKEDIN_URL = LINKEDIN_URL;
  INSTAGRAM_URL = INSTAGRAM_URL;
  FACEBOOK_URL = FACEBOOK_URL;

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
        this.sendingStatus = EmailSendingStatus.Sending;
        await this.emailService.sendEmail(
          this.contactForm.value as ContactRequest
        );
        this.contactForm.reset();
        this.sendingStatus = EmailSendingStatus.Ok;
        window.setTimeout(
          () => (this.sendingStatus = EmailSendingStatus.NotSent),
          3000
        );
      } catch (error) {
        this.sendingStatus = EmailSendingStatus.Error;
      }
    }
  }
}
