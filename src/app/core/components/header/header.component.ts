import { Component, Input, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  HOME_ROUTE,
  SKILLS_ROUTE,
} from '../../constants';
import { Pages } from '../../enums';
import { BackgroundService } from '../../services';

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

  constructor(
    private router: Router,
    private bgService: BackgroundService,
    private renderer: Renderer2
  ) {
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

        setTimeout(() => {
          const elements = document.getElementsByClassName(
            'hoverable'
          ) as HTMLCollectionOf<HTMLElement>;
          for (let i = 0; i < elements.length; i++) {
            elements[i].onmouseover = this.setMouseEnter.bind(this);
            elements[i].onmouseleave = this.setMouseLeave.bind(this);
          }
        }, this.bgService.animationTime * 1000);
      });
  }

  setMouseEnter(): void {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    this.renderer.addClass(cursor, 'hover');
  }

  setMouseLeave(): void {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    this.renderer.removeClass(cursor, 'hover');
  }
}
