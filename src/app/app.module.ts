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
  }
}
