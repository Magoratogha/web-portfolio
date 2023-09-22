import { animate, style, transition, trigger } from '@angular/animations';

export const InEaseIn = trigger('inEaseIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in', style({ opacity: 1 })),
  ]),
]);
