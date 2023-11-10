import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  keyframes,
  style,
} from '@angular/animations';
import { ElementRef, Injectable } from '@angular/core';
import { AnimationData } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  constructor(private builder: AnimationBuilder) {}

  public buildAnimation(
    element: ElementRef,
    animationData: AnimationData
  ): AnimationPlayer | null {
    let animation;
    switch (animationData.name) {
      case 'colored':
        animation = animate(
          '0.2s',
          keyframes([style({ color: animationData.params[0] })])
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
