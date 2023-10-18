import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() appContainer: HTMLElement | undefined;
  public currentPage: Pages = Pages.Home;
  private isNavigating: boolean = false;
  Pages = Pages;
  HOME_ROUTE = HOME_ROUTE;
  ABOUT_ROUTE = ABOUT_ROUTE;
  SKILLS_ROUTE = SKILLS_ROUTE;
  CONTACT_ROUTE = CONTACT_ROUTE;

  constructor(private bgService: BackgroundService, private router: Router) {
    switch (window.location.pathname.substring(1)) {
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
  }

  ngOnInit() {
    this.appContainer?.addEventListener('scroll', console.log);
  }

  /*@HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (!this.isNavigating) {
      this.navigate(event.deltaY > 0);
    }
  }*/

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
      this.isNavigating = false;
    }, this.bgService.animationTime * 1000);
  }
}
