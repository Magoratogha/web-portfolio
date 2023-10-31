import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const FastRouterAnimation = trigger('fastRouterAnimation', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(':leave', [style({ opacity: 1, position: 'relative' })], {
      optional: true,
    }),
    query(':leave', [animate('0.2s ease-out', style({ opacity: 0 }))], {
      optional: true,
    }),
    query(':leave', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(':enter', [style({ opacity: 1, position: 'relative' })], {
      optional: true,
    }),
  ]),
]);
