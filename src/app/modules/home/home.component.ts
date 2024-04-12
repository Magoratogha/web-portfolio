import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ABOUT_ROUTE, SKILLS_ROUTE } from 'src/app/constants';
import { AnalyticEvents, PageSections } from 'src/app/enums';
import { AnalyticsService, BackgroundService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [RouterLink],
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
