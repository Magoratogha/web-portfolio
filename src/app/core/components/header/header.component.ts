import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  HOME_ROUTE,
  SKILLS_ROUTE,
} from '../../constants';
import { Pages } from '../../enums';
import { BackgroundService } from '../../services';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public currentPage: Pages = Pages.Home;
  private isNavigating: boolean = false;
  private shouldScroll: boolean = false;
  private scrolledToEdge: boolean = false;
  private isTouchDevice: boolean = !!(
    window.navigator.maxTouchPoints || 'ontouchstart' in document
  );
  Pages = Pages;
  HOME_ROUTE = HOME_ROUTE;
  ABOUT_ROUTE = ABOUT_ROUTE;
  SKILLS_ROUTE = SKILLS_ROUTE;
  CONTACT_ROUTE = CONTACT_ROUTE;

  constructor(private bgService: BackgroundService, private router: Router) {
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
        setTimeout(
          () => this.setShouldScroll(),
          this.bgService.animationTime * 1000
        );
      });
  }

  private setShouldScroll(): void {
    const body = document.body,
      html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    this.shouldScroll = height > window.outerHeight;
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (!this.isNavigating && !this.shouldScroll && !this.isTouchDevice) {
      this.navigate(event.deltaY > 0);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.isNavigating && this.shouldScroll && !this.isTouchDevice) {
      if (
        window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight - window.innerHeight * 0.15 ||
        Math.round(window.scrollY) <= 0 + window.innerHeight * 0.15
      ) {
        if (
          window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight
        ) {
          if (this.scrolledToEdge) {
            this.navigate(true);
          } else {
            window.scrollTo(0, document.body.offsetHeight);
            setTimeout(() => {
              this.scrolledToEdge = true;
            }, 100);
          }
        }
        if (Math.round(window.scrollY) <= 0) {
          if (this.scrolledToEdge) {
            this.navigate(false);
          } else {
            window.scrollTo(0, 0);
            setTimeout(() => {
              this.scrolledToEdge = true;
            }, 100);
          }
        }
      } else {
        this.scrolledToEdge = false;
      }
    }
  }

  private navigate(next: boolean): void {
    if (next) {
      if (this.currentPage < Pages.Contact) {
        this.currentPage++;
      } else {
        return;
      }
    } else {
      if (this.currentPage > Pages.Home) {
        this.currentPage--;
      } else {
        return;
      }
    }
    this.isNavigating = true;
    switch (this.currentPage) {
      case Pages.Home:
        this.router.navigate([HOME_ROUTE]);
        break;
      case Pages.About:
        this.router.navigate([ABOUT_ROUTE]);
        break;
      case Pages.Skills:
        this.router.navigate([SKILLS_ROUTE]);
        break;
      case Pages.Contact:
        this.router.navigate([CONTACT_ROUTE]);
        break;
      default:
        this.router.navigate([HOME_ROUTE]);
        break;
    }
    setTimeout(() => {
      this.setShouldScroll();
      this.isNavigating = false;
    }, this.bgService.animationTime * 1000);
  }
}
