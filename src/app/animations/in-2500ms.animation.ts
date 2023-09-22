import { animate, style, transition, trigger } from '@angular/animations';

export const In2500ms = trigger('in2500ms', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms 2500ms', style({ opacity: 1 })),
  ]),
]);
