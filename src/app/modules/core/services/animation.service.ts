import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  keyframes,
  style,
} from '@angular/animations';
import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { AnimationData } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private renderer: Renderer2;

  constructor(
    private builder: AnimationBuilder,
    private rendererFactory2: RendererFactory2
  ) {
    this.renderer = this.rendererFactory2.createRenderer(null, null);
  }

  public buildAnimation(
    element: ElementRef,
    animationData: AnimationData
  ): AnimationPlayer | null {
    let animation;
    switch (animationData.name) {
      case 'svg-colored':
        animation = animate(
          '300ms',
          keyframes([
            style({
              color: animationData.params[0],
            }),
          ])
        );
        animationData.params[1] &&
          this.renderer.addClass(
            element.nativeElement,
            animationData.params[1]
          );
        animationData.params[2] &&
          this.renderer.removeClass(
            element.nativeElement,
            animationData.params[2]
          );
        break;

      default:
        break;
    }
    if (animation) {
      const factory = this.builder.build(animation);
      return factory.create(element.nativeElement);
    } else {
      return null;
    }
  }
}
