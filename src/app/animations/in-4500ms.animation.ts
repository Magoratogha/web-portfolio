import { animate, style, transition, trigger } from '@angular/animations';

export const In4500ms = trigger('in4500ms', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms 4500ms', style({ opacity: 1 })),
  ]),
]);
