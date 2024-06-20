import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { GREETING_MESSAGE } from '../../../shared/constants/miscellaneous';
import gsap from 'gsap';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements AfterViewInit, OnDestroy {
  GREETING_MESSAGE = GREETING_MESSAGE;
  @ViewChild('textMessageUp') textElementUp!: ElementRef;
  @ViewChild('textMessageDown') textElementDown!: ElementRef;
  mouseMoveUnlistenFn: Function | undefined;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.mouseMoveUnlistenFn = this.renderer.listen(
      document,
      'mousemove',
      (event: MouseEvent) => {
        const x = event.clientX / window.screen.width;
        gsap.to(this.textElementUp.nativeElement, {
          fontWeight: x * 500 + 300,
        });
        gsap.to(this.textElementDown.nativeElement, {
          fontWeight: (1 - x) * 500 + 300,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.mouseMoveUnlistenFn!();
  }
}
