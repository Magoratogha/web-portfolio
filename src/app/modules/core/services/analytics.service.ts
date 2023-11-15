import { Injectable, isDevMode } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { AnalyticEvents, PageSections } from 'src/app/enums';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private analytics: Analytics) {}

  public logEvent(
    section: PageSections,
    element: string,
    event: AnalyticEvents,
    eventParams?: any
  ): void {
    if (!isDevMode()) {
      logEvent(this.analytics, `${section}_${element}_${event}`, eventParams);
    }
  }
}
