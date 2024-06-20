import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import gsap from 'gsap';
import { PageTags } from '../../enums';
import { ScrollService } from '../../services';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @ViewChild('menubg') menubg!: ElementRef;
  @ViewChild('menuToggler') menuToggler!: ElementRef;
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  @Output() menuToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  isMenuOpen: WritableSignal<boolean> = signal(false);
  isAnimating: boolean = false;
  PageTags = PageTags;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private scrollService: ScrollService
  ) {}

  toggleMenu(): Promise<void> | void {
    if (!this.isAnimating) {
      return new Promise((resolve) => {
        this.animateToggle(!this.isMenuOpen());
        this.isAnimating = true;
        this.renderer.setStyle(
          this.menuContainer.nativeElement,
          'pointer-events',
          'none'
        );
        window.setTimeout(
          () => {
            this.isMenuOpen.update((currentValue) => !currentValue);
            this.changeDetectorRef.detectChanges();
            this.menuToggled.emit(this.isMenuOpen());
          },
          this.isMenuOpen() ? 1200 : 0
        );
        window.setTimeout(() => {
          this.isAnimating = false;
          this.renderer.setStyle(
            this.menuContainer.nativeElement,
            'pointer-events',
            'auto'
          );
          resolve();
        }, 1200);
      });
    }
  }

  animateToggle(isOpening: boolean) {
    if (isOpening) {
      gsap.to(this.menubg.nativeElement, {
        duration: 0.8,
        attr: {
          d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z',
        },
        ease: 'power3.in',
        delay: 0,
      });
      gsap.to(this.menubg.nativeElement, {
        duration: 0.4,
        attr: {
          d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z',
        },
        ease: 'power3.out',
        delay: 0.8,
      });
      this.animateMenuItem('.home', 0.9, true);
      this.animateMenuItem('.about', 1, true);
      this.animateMenuItem('.skills', 1.1, true);
      this.animateMenuItem('.contact', 1.2, true);
    } else {
      gsap.to(this.menubg.nativeElement, {
        duration: 0.8,
        attr: {
          d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z',
        },
        ease: 'power3.in',
        delay: 0,
      });
      gsap.to(this.menubg.nativeElement, {
        duration: 0.4,
        attr: {
          d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z',
        },
        ease: 'power3.out',
        delay: 0.8,
      });
      this.animateMenuItem('.contact', 0, false);
      this.animateMenuItem('.skills', 0.1, false);
      this.animateMenuItem('.about', 0.1, false);
      this.animateMenuItem('.home', 0.2, false);
    }
  }

  animateMenuItem(element: string, delay: number, isOpening: boolean) {
    if (isOpening) {
      let newText = '';
      let theText = document.querySelector(element) as HTMLElement;
      for (let i = 0; i < theText.innerText.length; i++) {
        newText += '<div>';
        if (theText.innerText[i] == ' ') {
          newText += '&nbsp;';
        } else {
          newText += theText.innerText[i];
        }
        newText += '</div>';
      }
      theText.innerHTML = newText;
      gsap.fromTo(
        element + ' div',
        {
          opacity: 0,
          y: 90,
        },
        {
          duration: 1,
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: 'elastic(1, 0.6)',
          delay: delay,
        }
      );
    } else {
      gsap.fromTo(
        element + ' div',
        {
          opacity: 1,
          y: 0,
        },
        {
          duration: 1,
          opacity: 0,
          y: 90,
          stagger: 0.03,
          ease: 'elastic(0.5, 0.8)',
          delay: delay,
        }
      );
    }
  }

  async navigate(pageTag: PageTags): Promise<void> {
    await this.toggleMenu();
    this.scrollService.scrollTo('#' + pageTag);
  }
}
