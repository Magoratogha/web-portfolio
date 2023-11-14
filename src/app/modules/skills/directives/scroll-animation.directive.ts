import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { AnimationService } from '../../core/services';
import { AnimationData } from 'src/app/models';
import { BG_ANIMATION_TIME } from 'src/app/constants';

@Directive({
  selector: '[scrollAnimation]',
})
export class ScrollAnimationDirective implements AfterViewInit, OnDestroy {
  @Input() public scrollDelay: number = window.innerHeight * 0.15;
  @Input() public inAnimationData: AnimationData | undefined;
  @Input() public outAnimationData: AnimationData | undefined;
  private inAnimationTimeout: number = 0;
  private outAnimationTimeout: number = 0;
  private isAnimating: boolean = false;
  private isInAnimationDone: boolean = false;
  private elementPosition: number = 0;
  private scrollUnlistenerFn: Function = () => {};
  private resizeUnlistenerFn: Function = () => {};

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private animationService: AnimationService
  ) {}

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      this.elementPosition = this.element.nativeElement.offsetTop;
      this.scrollUnlistenerFn = this.renderer.listen(
        window,
        'scroll',
        this.onScroll.bind(this)
      );
      this.resizeUnlistenerFn = this.renderer.listen(
        window,
        'resize',
        this.onResize.bind(this)
      );
    }, BG_ANIMATION_TIME * 1000);
  }

  private onScroll(): void {
    console.log(window.scrollY, this.elementPosition, window.innerHeight);
    if (!this.isAnimating) {
      if (
        window.scrollY >
        this.elementPosition - window.innerHeight / 2 - this.scrollDelay
      ) {
        if (!this.isInAnimationDone && this.inAnimationData) {
          const inAnimation = this.animationService.buildAnimation(
            this.element,
            this.inAnimationData
          );
          this.isAnimating = true;
          this.inAnimationTimeout = window.setTimeout(() => {
            inAnimation?.play();
            this.isAnimating = false;
            this.isInAnimationDone = true;
          }, this.inAnimationData.delay);
        }
      } else {
        if (this.isInAnimationDone && this.outAnimationData) {
          const outAnimation = this.animationService.buildAnimation(
            this.element,
            this.outAnimationData
          );
          this.isAnimating = true;
          this.outAnimationTimeout = window.setTimeout(() => {
            outAnimation?.play();
            this.isAnimating = false;
            this.isInAnimationDone = false;
          }, this.outAnimationData.delay);
        }
      }
    }
  }

  private onResize(): void {
    this.elementPosition = this.element.nativeElement.offsetTop;
  }

  ngOnDestroy(): void {
    this.scrollUnlistenerFn();
    this.resizeUnlistenerFn();
    window.clearTimeout(this.inAnimationTimeout);
    window.clearTimeout(this.outAnimationTimeout);
  }
}
