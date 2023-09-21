import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GreetingComponent } from './components/greeting/greeting.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { SkillsComponent } from './components/skills/skills.component';
import { ScrollAnimationDirective } from './directives/scroll-animation/scroll-animation.directive';
import faceIcon from '!!raw-loader!../assets/images/face.svg';
import homeIcon from '!!raw-loader!../assets/images/home.svg';
import workIcon from '!!raw-loader!../assets/images/work.svg';
import sendIcon from '!!raw-loader!../assets/images/send.svg';
import closeIcon from '!!raw-loader!../assets/images/close.svg';
import faceBoldIcon from '!!raw-loader!../assets/images/face-bold.svg';
import homeBoldIcon from '!!raw-loader!../assets/images/home-bold.svg';
import workBoldIcon from '!!raw-loader!../assets/images/work-bold.svg';
import sendBoldIcon from '!!raw-loader!../assets/images/send-bold.svg';
import linkedinIcon from '!!raw-loader!../assets/images/linkedin.svg';
import facebookIcon from '!!raw-loader!../assets/images/facebook.svg';
import githubIcon from '!!raw-loader!../assets/images/github.svg';
import instagramIcon from '!!raw-loader!../assets/images/instagram.svg';

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
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'face',
      sanitizer.bypassSecurityTrustHtml(faceIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'home',
      sanitizer.bypassSecurityTrustHtml(homeIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'work',
      sanitizer.bypassSecurityTrustHtml(workIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'send',
      sanitizer.bypassSecurityTrustHtml(sendIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'face-bold',
      sanitizer.bypassSecurityTrustHtml(faceBoldIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'home-bold',
      sanitizer.bypassSecurityTrustHtml(homeBoldIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'work-bold',
      sanitizer.bypassSecurityTrustHtml(workBoldIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'send-bold',
      sanitizer.bypassSecurityTrustHtml(sendBoldIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'close',
      sanitizer.bypassSecurityTrustHtml(closeIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'instagram',
      sanitizer.bypassSecurityTrustHtml(instagramIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'facebook',
      sanitizer.bypassSecurityTrustHtml(facebookIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'github',
      sanitizer.bypassSecurityTrustHtml(githubIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'linkedin',
      sanitizer.bypassSecurityTrustHtml(linkedinIcon)
    );
  }
}
