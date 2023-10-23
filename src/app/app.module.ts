import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent, MainLoaderComponent } from './core/components';
import {
  AboutMeComponent,
  ContactComponent,
  HomeComponent,
  SkillsComponent,
} from './pages';

@NgModule({
  declarations: [
    AppComponent,
    MainLoaderComponent,
    HomeComponent,
    HeaderComponent,
    AboutMeComponent,
    SkillsComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
