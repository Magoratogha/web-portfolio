import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { FastRouterAnimation } from 'src/app/animations';
import {
  ABOUT_FREELANCE_ROUTE,
  ABOUT_GLOBANT_ROUTE,
  ABOUT_ME_ROUTE,
  ABOUT_ROUTE,
  ABOUT_VCSOFT_ROUTE,
} from 'src/app/constants';
import { BackgroundService } from '../../modules/core/services';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [FastRouterAnimation],
})
export class AboutMeComponent implements OnInit {
  public showWork: boolean = false;
  ABOUT_ME_ROUTE = ABOUT_ME_ROUTE;
  ABOUT_GLOBANT_ROUTE = ABOUT_GLOBANT_ROUTE;
  ABOUT_VCSOFT_ROUTE = ABOUT_VCSOFT_ROUTE;
  ABOUT_FREELANCE_ROUTE = ABOUT_FREELANCE_ROUTE;

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
}
