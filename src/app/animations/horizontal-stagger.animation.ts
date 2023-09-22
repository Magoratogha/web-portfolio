import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const HorizontalStagger = trigger('horizontalStagger', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),
    query(
      ':enter',
      stagger('40ms', [
        animate(
          '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          keyframes([
            style({ opacity: 0, transform: 'translateX(10px)' }),
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
            style({ opacity: 0, transform: 'translateX(10px)' }),
          ])
        ),
      ]),
      { optional: true }
    ),
  ]),
]);
