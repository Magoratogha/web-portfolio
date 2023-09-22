import { animate, style, transition, trigger } from '@angular/animations';

export const In1800ms = trigger('in1800ms', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms 1800ms', style({ opacity: 1 })),
  ]),
]);
