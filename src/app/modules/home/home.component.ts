import { Component, OnInit } from '@angular/core';
import { ABOUT_ROUTE, SKILLS_ROUTE } from 'src/app/constants';
import { AnalyticsService, BackgroundService } from '../core/services';
import { AnalyticEvents, PageSections } from 'src/app/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ABOUT_ROUTE = ABOUT_ROUTE;
  SKILLS_ROUTE = SKILLS_ROUTE;

  constructor(
    private bgService: BackgroundService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.analyticsService.logEvent(
      PageSections.Home,
      'page',
      AnalyticEvents.Loaded
    );
    this.bgService.setInmerseView();
  }

  public logEvent(element: string): void {
    this.analyticsService.logEvent(
      PageSections.Home,
      element,
      AnalyticEvents.Clicked
    );
  }
}
