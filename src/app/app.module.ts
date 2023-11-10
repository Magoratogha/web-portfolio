import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import madeInColombiaIcon from '!!raw-loader!../assets/images/made-in-colombia.svg';
import clickHereIcon from '!!raw-loader!../assets/images/click-here.svg';
import angularIcon from '!!raw-loader!../assets/images/angular.svg';
import jsIcon from '!!raw-loader!../assets/images/js.svg';
import tsIcon from '!!raw-loader!../assets/images/ts.svg';
import htmlIcon from '!!raw-loader!../assets/images/html.svg';
import cssIcon from '!!raw-loader!../assets/images/css.svg';
import bootatrapIcon from '!!raw-loader!../assets/images/bootstrap.svg';
import threeJsIcon from '!!raw-loader!../assets/images/three-js.svg';
import rxjsIcon from '!!raw-loader!../assets/images/rxjs.svg';
import jasmineIcon from '!!raw-loader!../assets/images/jasmine.svg';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
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
  }
}
