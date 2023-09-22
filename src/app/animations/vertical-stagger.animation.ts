import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const VerticalStagger = trigger('verticalStagger', [
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
]);
