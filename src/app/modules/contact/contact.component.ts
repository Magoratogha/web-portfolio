import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  FACEBOOK_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  IS_SMALL_MOBILE_DEVICE,
  LINKEDIN_URL,
} from 'src/app/constants';
import {
  AnalyticEvents,
  EmailSendingStatus,
  PageSections,
} from 'src/app/enums';
import { ContactRequest } from 'src/app/models';
import {
  AnalyticsService,
  BackgroundService,
} from '../../modules/core/services';
import { ContactFormService } from './services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatIcon
],
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
    private emailService: ContactFormService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.analyticsService.logEvent(
      PageSections.Contact,
      'page',
      AnalyticEvents.Loaded
    );
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
        this.analyticsService.logEvent(
          PageSections.Contact,
          'contactForm',
          AnalyticEvents.Submited,
          {
            formValue: this.contactForm.value,
          }
        );
        window.setTimeout(
          () => (this.sendingStatus = EmailSendingStatus.NotSent),
          3000
        );
      } catch (error) {
        this.sendingStatus = EmailSendingStatus.Error;
        this.analyticsService.logEvent(
          PageSections.Contact,
          'contactForm',
          AnalyticEvents.Error,
          {
            formValue: this.contactForm.value,
            error,
          }
        );
        window.setTimeout(
          () => (this.sendingStatus = EmailSendingStatus.NotSent),
          3000
        );
      }
    }
  }

  public logEvent(element: string): void {
    this.analyticsService.logEvent(
      PageSections.Contact,
      element,
      AnalyticEvents.Clicked
    );
  }
}
