import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconChange, Leave, RouterAnimation } from './animations';
import { BackgroundService } from './modules/core/services';
import { IS_TOUCH_DEVICE } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Leave(), RouterAnimation, IconChange],
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
    private renderer: Renderer2
  ) {
    this.isDarkMode = localStorage.getItem('darkMode')
      ? localStorage.getItem('darkMode') === 'true'
      : true;
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
