import { Component } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { PageTags } from '../shared/enums';
import { ScrollService } from '../shared/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public pageTags = PageTags;

  constructor(private scrollService: ScrollService) {}

  navigate(pageTag: PageTags): void {
    this.scrollService.scrollTo('#' + pageTag);
  }
}
