import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { FastRouterAnimation } from 'src/app/animations';
import {
  ABOUT_ME_ROUTE,
  ABOUT_ROUTE,
  ABOUT_WORK_ROUTE,
} from 'src/app/constants';
import { BackgroundService } from '../../modules/core/services';
import { ItemDetailsComponent } from './components';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [FastRouterAnimation],
})
export class AboutMeComponent implements OnInit {
  public showWork: boolean = false;
  ABOUT_ME_ROUTE = ABOUT_ME_ROUTE;
  ABOUT_WORK_ROUTE = ABOUT_WORK_ROUTE;
  timelineSubs: Subscription | undefined;
  activeTimelineSection: string | undefined;

  constructor(private router: Router, private bgService: BackgroundService) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
        const url = (event as NavigationEnd).url.split('/').pop();
        if (url == ABOUT_ME_ROUTE || url == ABOUT_ROUTE) {
          this.showWork = false;
        } else {
          this.showWork = true;
        }
      });
  }

  ngOnInit(): void {
    this.bgService.setMiddleView();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  scrollToSection(id: string, padding: number) {
    window.scrollTo({
      top:
        (document.getElementById(id)?.getBoundingClientRect().top as number) +
        window.scrollY -
        this.remToPx(padding),
    });
  }

  private remToPx(rem: number) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  componentActivated(component: any) {
    if (component instanceof ItemDetailsComponent) {
      this.timelineSubs = component.sectionChanged.subscribe((section) => {
        this.activeTimelineSection = section;
      });
    }
  }

  componentDeactivated(component: any) {
    if (component instanceof ItemDetailsComponent) {
      this.timelineSubs && this.timelineSubs.unsubscribe();
    }
  }
}
