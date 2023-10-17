import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const RouterAnimation = trigger('routerAnimation', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('0.5s ease-out', style({ opacity: 0, position: 'relative' })),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1, position: 'absolute' })),
      ],
      { optional: true }
    ),
  ]),
]);
