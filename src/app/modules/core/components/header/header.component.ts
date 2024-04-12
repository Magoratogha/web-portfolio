import { Component, Renderer2 } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { Leave } from '../../../../animations';
import {
  ABOUT_ROUTE,
  BG_ANIMATION_TIME,
  CONTACT_ROUTE,
  FACEBOOK_URL,
  GITHUB_URL,
  HOME_ROUTE,
  INSTAGRAM_URL,
  IS_SMALL_MOBILE_DEVICE,
  IS_TOUCH_DEVICE,
  LINKEDIN_URL,
  SKILLS_ROUTE,
} from '../../../../constants';
import { AnalyticEvents, PageSections, Pages } from '../../../../enums';
import { AnalyticsService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [Leave()],
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
})
export class HeaderComponent {
  public currentPage: Pages = Pages.Home;
  private cursor: HTMLElement | undefined;
  Pages = Pages;
  HOME_ROUTE = HOME_ROUTE;
  ABOUT_ROUTE = ABOUT_ROUTE;
  SKILLS_ROUTE = SKILLS_ROUTE;
  CONTACT_ROUTE = CONTACT_ROUTE;
  GITHUB_URL = GITHUB_URL;
  LINKEDIN_URL = LINKEDIN_URL;
  INSTAGRAM_URL = INSTAGRAM_URL;
  FACEBOOK_URL = FACEBOOK_URL;
  IS_SMALL_MOBILE_DEVICE = IS_SMALL_MOBILE_DEVICE;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private analyticsService: AnalyticsService
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

        if (!IS_TOUCH_DEVICE()) {
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

  public logEvent(element: string): void {
    this.analyticsService.logEvent(
      PageSections.Global,
      element,
      AnalyticEvents.Clicked
    );
  }
}
