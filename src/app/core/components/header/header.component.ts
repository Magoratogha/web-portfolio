import { Component, Input, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  ABOUT_ROUTE,
  BG_ANIMATION_TIME,
  CONTACT_ROUTE,
  HOME_ROUTE,
  IS_TOUCH_DEVICE,
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
  private cursor: HTMLElement | undefined;
  Pages = Pages;
  HOME_ROUTE = HOME_ROUTE;
  ABOUT_ROUTE = ABOUT_ROUTE;
  SKILLS_ROUTE = SKILLS_ROUTE;
  CONTACT_ROUTE = CONTACT_ROUTE;

  constructor(private router: Router, private renderer: Renderer2) {
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

        if (!IS_TOUCH_DEVICE) {
          this.cursor = document.querySelector('.cursor') as HTMLElement;
          setTimeout(() => {
            const elements = document.getElementsByClassName(
              'hoverable'
            ) as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < elements.length; i++) {
              elements[i].onmouseover = this.setMouseEnter.bind(this);
              elements[i].onmouseleave = this.setMouseLeave.bind(this);
            }
          }, BG_ANIMATION_TIME * 1000);
        }
      });
  }

  setMouseEnter(): void {
    this.renderer.addClass(this.cursor, 'hover');
  }

  setMouseLeave(): void {
    this.renderer.removeClass(this.cursor, 'hover');
  }
}
