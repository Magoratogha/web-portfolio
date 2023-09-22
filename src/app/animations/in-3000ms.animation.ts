import { animate, style, transition, trigger } from '@angular/animations';

export const In3000ms = trigger('in3000ms', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms 3000ms', style({ opacity: 1 })),
  ]),
]);
