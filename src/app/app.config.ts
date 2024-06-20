import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FIREBASE_CONFIG } from '../../firebase-options';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
      provideAnalytics(() => getAnalytics())
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
