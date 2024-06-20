import { Component } from '@angular/core';
import { PageTags } from '../../shared/enums';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public pageTag = PageTags.CONTACT;
}
