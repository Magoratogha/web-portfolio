import { animate, style, transition, trigger } from '@angular/animations';

export const In1500ms = trigger('in1500ms', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms 1500ms', style({ opacity: 1 })),
  ]),
]);
