import { animate, style, transition, trigger } from '@angular/animations';

export const Leave = (delay?: number) => {
  return trigger(delay ? `leave${delay}ms` : 'leave', [
    transition(':leave', [
      style({ opacity: 1 }),
      animate(`300ms ${delay || 0}ms ease-out`, style({ opacity: 0 })),
    ]),
  ]);
};
