import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('boldAnimation', [
      state(
        'true',
        style({
          'font-size': '1em',
          'font-weight': 'bold',
        })
      ),
      state(
        'false',
        style({
          'font-size': '0.875em',
          'font-weight': 'normal',
        })
      ),
      transition('false => true', [animate('100ms')]),
      transition('true => false', [animate('100ms')]),
    ]),
    trigger('iconChange', [
      transition(
        '* <=> *',
        animate(
          '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          keyframes([
            style({ opacity: 0, transform: 'translateY(10px)' }),
            style({ opacity: 1, transform: 'translateY(0)' }),
          ])
        )
      ),
    ]),
    trigger('verticalStagger', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('40ms', [
            animate(
              '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
              keyframes([
                style({ opacity: 0, transform: 'translateY(10px)' }),
                style({ opacity: 1, transform: 'translateY(0)' }),
              ])
            ),
          ]),
          { optional: true }
        ),
        query(':leave', style({ opacity: 1 }), { optional: true }),
        query(
          ':leave',
          stagger('40ms', [
            animate(
              '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
              keyframes([
                style({ opacity: 1, transform: 'translateY(0)' }),
                style({ opacity: 0, transform: 'translateY(10px)' }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
    trigger('horizontalStagger', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('40ms', [
            animate(
              '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
              keyframes([
                style({ opacity: 0, transform: 'translateX(-10px)' }),
                style({ opacity: 1, transform: 'translateX(0)' }),
              ])
            ),
          ]),
          { optional: true }
        ),
        query(':leave', style({ opacity: 1 }), { optional: true }),
        query(
          ':leave',
          stagger('40ms', [
            animate(
              '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
              keyframes([
                style({ opacity: 1, transform: 'translateX(0)' }),
                style({ opacity: 0, transform: 'translateX(-10px)' }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  @Input() public currentSection = 0;
  @Input() public componentsPositions: number[] = [];
  public isExpanded: boolean = false;
  public sections: any[] = [
    { label: 'Contact', iconName: 'send', sectionNumber: 3 },
    { label: 'My skills', iconName: 'face', sectionNumber: 2 },
    { label: 'About me', iconName: 'work', sectionNumber: 1 },
    { label: 'Home', iconName: 'home', sectionNumber: 0 },
  ];
  public links: any[] = [
    { url: 'https://github.com/Magoratogha', iconName: 'github' },
    { url: 'https://www.linkedin.com/in/magoratogha', iconName: 'linkedin' },
    { url: 'https://www.instagram.com/magoratogha', iconName: 'instagram' },
    { url: 'https://www.facebook.com/Magoratoga', iconName: 'facebook' },
  ];

  constructor() {}

  public scrollToSection(section: number): void {
    window.scrollTo({
      top: this.componentsPositions[section],
      behavior: 'smooth',
    });
  }

  public getSectionIconClass(bold?: boolean): string {
    return this.isExpanded
      ? 'close'
      : this.sections.find(
          (section) => section.sectionNumber === this.currentSection
        )?.iconName + (bold ? '-bold' : '');
  }
}
