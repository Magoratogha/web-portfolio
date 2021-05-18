import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../../services/email/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public isMessageSending = false;
  public isMessageSent = false;
  public wasSuccessfullySent = false;
  public contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) { }

  ngOnInit(): void {
  }

  public onFormSubmit(): void {
    this.isMessageSending = true;
    this.isMessageSent = false;
    this.contactForm.disable();
    this.emailService.sendEmail(this.contactForm.value).then(() => {
      this.wasSuccessfullySent = true;
      this.isMessageSent = true;
      this.contactForm.enable();
      window.setTimeout(() => {
        this.isMessageSending = false;
        this.isMessageSent = false;
      }, 1000);
    }).catch(() => {
      this.wasSuccessfullySent = false;
      this.isMessageSent = true;
      this.contactForm.enable();
    });
  }

}
