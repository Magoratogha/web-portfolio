import { ElementRef, Renderer2 } from '@angular/core';
import { inject } from '@angular/core/testing';
import { AnimationService } from 'src/app/services/animation/animation.service';
import { ScrollAnimationDirective } from './scroll-animation.directive';

describe('ScrolledAnimationDirective', () => {
  it('should create an instance', inject([Renderer2, AnimationService], (renderer: Renderer2, animationService: AnimationService) => {
    const el = new ElementRef(null);
    const directive = new ScrollAnimationDirective(el, renderer, animationService);
    expect(directive).toBeTruthy();
  }));
});
