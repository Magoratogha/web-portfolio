import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Leave, RouterAnimation } from './core/animations';
import { BackgroundService } from './core/services';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Leave(), RouterAnimation],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('bg', { read: ElementRef })
  private canvas: ElementRef<HTMLElement> | undefined;
  @ViewChild('container', { read: ElementRef })
  public container: ElementRef<HTMLElement> | undefined;
  public isLoading: boolean = true;

  constructor(private backgroundService: BackgroundService) {}

  ngOnInit(): void {
    window.setTimeout(() => (this.isLoading = false), 2000);
  }

  ngAfterViewInit(): void {
    this.backgroundService.initBackground(
      this.canvas?.nativeElement as HTMLElement
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
