import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  HOME_ROUTE,
  SKILLS_ROUTE,
} from '../../constants';
import { Pages } from '../../enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isDarkMode: boolean = true;
  public currentPage: Pages = Pages.Home;
  Pages = Pages;
  HOME_ROUTE = HOME_ROUTE;
  ABOUT_ROUTE = ABOUT_ROUTE;
  SKILLS_ROUTE = SKILLS_ROUTE;
  CONTACT_ROUTE = CONTACT_ROUTE;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
        switch ((event as NavigationEnd).url.substring(1)) {
          case HOME_ROUTE:
            this.currentPage = Pages.Home;
            break;
          case ABOUT_ROUTE:
            this.currentPage = Pages.About;
            break;
          case SKILLS_ROUTE:
            this.currentPage = Pages.Skills;
            break;
          case CONTACT_ROUTE:
            this.currentPage = Pages.Contact;
            break;
          default:
            this.currentPage = Pages.Home;
            break;
        }
      });
  }
}
