import { Injectable } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scroll: LocomotiveScroll | undefined;

  constructor() {}

  initScroll(scrollContainer: HTMLElement): void {
    this.scroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
    });
  }

  scrollTo(target: string): void {
    this.scroll?.scrollTo(target);
  }
}
