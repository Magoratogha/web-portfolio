import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IconChange, Leave, RouterAnimation } from './core/animations';
import { BackgroundService } from './core/services';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Leave(), RouterAnimation, IconChange],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('bg', { read: ElementRef })
  private canvas: ElementRef<HTMLElement> | undefined;
  public isLoading: boolean = true;
  public isDarkMode: boolean;

  constructor(
    private bgService: BackgroundService,
    private renderer: Renderer2
  ) {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (!this.isDarkMode) {
      this.renderer.addClass(document.body, 'light');
    }
  }

  ngOnInit(): void {
    window.setTimeout(() => (this.isLoading = false), 2000);
  }

  ngAfterViewInit(): void {
    this.bgService.initBackground(this.canvas?.nativeElement as HTMLElement);
    if (!this.isDarkMode) {
      this.bgService.setLightMode();
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  setTheme(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
    localStorage.setItem('darkMode', String(isDarkMode));
    if (isDarkMode) {
      this.renderer.removeClass(document.body, 'light');
      this.bgService.setDarkMode();
    } else {
      this.renderer.addClass(document.body, 'light');
      this.bgService.setLightMode();
    }
  }
}
