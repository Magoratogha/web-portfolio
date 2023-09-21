import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GreetingComponent } from './components/greeting/greeting.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { SkillsComponent } from './components/skills/skills.component';
import { ScrollAnimationDirective } from './directives/scroll-animation/scroll-animation.directive';

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    AboutMeComponent,
    HeaderComponent,
    ContactComponent,
    SkillsComponent,
    ScrollAnimationDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
