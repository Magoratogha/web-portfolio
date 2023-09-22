import { animate, style, transition, trigger } from '@angular/animations';

export const In1300ms = trigger('in1300ms', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms 1300ms', style({ opacity: 1 })),
  ]),
]);
