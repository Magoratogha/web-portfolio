import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import {
  angularIcon,
  awsIcon,
  bootatrapIcon,
  clickHereIcon,
  cplusplusIcon,
  cssIcon,
  dockerIcon,
  firebaseIcon,
  gitIcon,
  htmlIcon,
  jasmineIcon,
  jsIcon,
  madeInColombiaIcon,
  nodeJsIcon,
  rxjsIcon,
  threeJsIcon,
  tsIcon,
} from 'src/assets/images/svgs';
import { IconChange, Leave, RouterAnimation } from './animations';
import { IS_TOUCH_DEVICE, MAIN_LOADER_TIME } from './constants';
import { AnalyticEvents, PageSections } from './enums';
import {
  HeaderComponent,
  MainLoaderComponent,
} from './modules/core/components';
import { AnalyticsService, BackgroundService } from './modules/core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Leave(), RouterAnimation, IconChange],
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    MatIcon,
    MainLoaderComponent,
    HeaderComponent
],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('bg', { read: ElementRef })
  private canvas: ElementRef<HTMLElement> | undefined;
  public isLoading: boolean = true;
  public isDarkMode: boolean;
  private unlistenMousemoveFn: Function | undefined;
  private cursor: HTMLElement | undefined;
  IS_TOUCH_DEVICE = IS_TOUCH_DEVICE;

  constructor(
    private bgService: BackgroundService,
    private renderer: Renderer2,
    private analyticsService: AnalyticsService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.isDarkMode = localStorage.getItem('darkMode')
      ? localStorage.getItem('darkMode') === 'true'
      : true;
    if (!this.isDarkMode) {
      this.renderer.addClass(document.body, 'light');
    }
    this.iconRegistry.addSvgIconLiteral(
      'made-in-colombia',
      this.sanitizer.bypassSecurityTrustHtml(madeInColombiaIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'click-here',
      this.sanitizer.bypassSecurityTrustHtml(clickHereIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'angular',
      this.sanitizer.bypassSecurityTrustHtml(angularIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'js',
      this.sanitizer.bypassSecurityTrustHtml(jsIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'ts',
      this.sanitizer.bypassSecurityTrustHtml(tsIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'html',
      this.sanitizer.bypassSecurityTrustHtml(htmlIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'css',
      this.sanitizer.bypassSecurityTrustHtml(cssIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'bootstrap',
      this.sanitizer.bypassSecurityTrustHtml(bootatrapIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'three-js',
      this.sanitizer.bypassSecurityTrustHtml(threeJsIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'rxjs',
      this.sanitizer.bypassSecurityTrustHtml(rxjsIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'jasmine',
      this.sanitizer.bypassSecurityTrustHtml(jasmineIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'node-js',
      this.sanitizer.bypassSecurityTrustHtml(nodeJsIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'firebase',
      this.sanitizer.bypassSecurityTrustHtml(firebaseIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'c++',
      this.sanitizer.bypassSecurityTrustHtml(cplusplusIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'git',
      this.sanitizer.bypassSecurityTrustHtml(gitIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'aws',
      this.sanitizer.bypassSecurityTrustHtml(awsIcon)
    );
    this.iconRegistry.addSvgIconLiteral(
      'docker',
      this.sanitizer.bypassSecurityTrustHtml(dockerIcon)
    );
  }

  ngOnInit(): void {
    window.setTimeout(() => (this.isLoading = false), MAIN_LOADER_TIME);
  }

  ngAfterViewInit(): void {
    this.bgService.initBackground(this.canvas?.nativeElement as HTMLElement);
    if (!this.isDarkMode) {
      this.bgService.setLightMode();
    }

    if (!IS_TOUCH_DEVICE()) {
      this.cursor = document.querySelector('.cursor') as HTMLElement;
      this.unlistenMousemoveFn = this.renderer.listen(
        document,
        'mousemove',
        this.onMouseMove.bind(this)
      );
    }
  }

  onMouseMove($event: MouseEvent) {
    let x = $event.clientX;
    let y = $event.clientY;
    this.renderer.setStyle(this.cursor, 'left', x - 12 + 'px');
    this.renderer.setStyle(this.cursor, 'top', y - 12 + 'px');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  setTheme(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
    localStorage.setItem('darkMode', String(isDarkMode));
    this.analyticsService.logEvent(
      PageSections.Global,
      'themeButtonToggler',
      AnalyticEvents.Clicked,
      {
        settedTheme: isDarkMode ? 'dark' : 'light',
      }
    );
    if (isDarkMode) {
      this.renderer.removeClass(document.body, 'light');
      this.bgService.setDarkMode();
    } else {
      this.renderer.addClass(document.body, 'light');
      this.bgService.setLightMode();
    }
  }

  ngOnDestroy(): void {
    this.unlistenMousemoveFn && this.unlistenMousemoveFn();
  }
}
