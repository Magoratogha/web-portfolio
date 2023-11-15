import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnalyticsService, BackgroundService } from '../core/services';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AnalyticEvents, PageSections } from 'src/app/enums';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit, OnDestroy {
  constructor(
    private bgService: BackgroundService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.analyticsService.logEvent(
      PageSections.Skills,
      'page',
      AnalyticEvents.Loaded
    );
    this.bgService.setPanoramicView();
  }

  onCheckboxChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.bgService.activateGlitchEffect();
    } else {
      this.bgService.deactivateGlitchEffect();
    }
    this.logEvent('glitchButton', {
      action: event.checked ? 'activate' : 'deactivate',
    });
  }

  public logEvent(element: string, params?: any): void {
    this.analyticsService.logEvent(
      PageSections.Skills,
      element,
      AnalyticEvents.Clicked,
      params
    );
  }

  ngOnDestroy(): void {
    this.bgService.deactivateGlitchEffect();
  }
}
