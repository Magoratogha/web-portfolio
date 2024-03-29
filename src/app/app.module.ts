import angularIcon from '!!raw-loader!../assets/images/angular.svg';
import awsIcon from '!!raw-loader!../assets/images/aws.svg';
import bootatrapIcon from '!!raw-loader!../assets/images/bootstrap.svg';
import cplusplusIcon from '!!raw-loader!../assets/images/c++.svg';
import clickHereIcon from '!!raw-loader!../assets/images/click-here.svg';
import cssIcon from '!!raw-loader!../assets/images/css.svg';
import dockerIcon from '!!raw-loader!../assets/images/docker.svg';
import firebaseIcon from '!!raw-loader!../assets/images/firebase.svg';
import gitIcon from '!!raw-loader!../assets/images/git.svg';
import htmlIcon from '!!raw-loader!../assets/images/html.svg';
import jasmineIcon from '!!raw-loader!../assets/images/jasmine.svg';
import jsIcon from '!!raw-loader!../assets/images/js.svg';
import madeInColombiaIcon from '!!raw-loader!../assets/images/made-in-colombia.svg';
import nodeJsIcon from '!!raw-loader!../assets/images/nodejs.svg';
import rxjsIcon from '!!raw-loader!../assets/images/rxjs.svg';
import threeJsIcon from '!!raw-loader!../assets/images/three-js.svg';
import tsIcon from '!!raw-loader!../assets/images/ts.svg';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FIREBASE_CONFIG } from 'firebase-options';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideAnalytics(() => getAnalytics()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'made-in-colombia',
      sanitizer.bypassSecurityTrustHtml(madeInColombiaIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'click-here',
      sanitizer.bypassSecurityTrustHtml(clickHereIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'angular',
      sanitizer.bypassSecurityTrustHtml(angularIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'js',
      sanitizer.bypassSecurityTrustHtml(jsIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'ts',
      sanitizer.bypassSecurityTrustHtml(tsIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'html',
      sanitizer.bypassSecurityTrustHtml(htmlIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'css',
      sanitizer.bypassSecurityTrustHtml(cssIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'bootstrap',
      sanitizer.bypassSecurityTrustHtml(bootatrapIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'three-js',
      sanitizer.bypassSecurityTrustHtml(threeJsIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'rxjs',
      sanitizer.bypassSecurityTrustHtml(rxjsIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'jasmine',
      sanitizer.bypassSecurityTrustHtml(jasmineIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'node-js',
      sanitizer.bypassSecurityTrustHtml(nodeJsIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'firebase',
      sanitizer.bypassSecurityTrustHtml(firebaseIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'c++',
      sanitizer.bypassSecurityTrustHtml(cplusplusIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'git',
      sanitizer.bypassSecurityTrustHtml(gitIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'aws',
      sanitizer.bypassSecurityTrustHtml(awsIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'docker',
      sanitizer.bypassSecurityTrustHtml(dockerIcon)
    );
  }
}
