import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../../services/email/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {

  @ViewChild('componentContainer') componentContainer: ElementRef | undefined;
  @Output() componentResized = new EventEmitter<number>();
  public isMessageSending = false;
  public isMessageSent = false;
  public wasSuccessfullySent = false;
  public isDesktopDevice: MediaQueryList = matchMedia('(min-width: 768px)');
  public contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) { }

  ngAfterViewInit(): void {
    this.onWindowResize();
  }

  @HostListener('window:resize')
  private onWindowResize(): void {
    this.componentResized.emit(this.componentContainer?.nativeElement.getBoundingClientRect().top + window.scrollY);
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
      }, 3000);
    }).catch(() => {
      this.wasSuccessfullySent = false;
      this.isMessageSent = true;
      this.contactForm.enable();
    });
  }

}
