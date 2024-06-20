import { Component } from '@angular/core';
import { PageTags } from '../../shared/enums';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  public pageTag = PageTags.ABOUT;

}
