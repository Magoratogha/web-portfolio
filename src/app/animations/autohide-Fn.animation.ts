import { animate, style, transition, trigger } from '@angular/animations';

export const AutoHide = (delay: number) => {
  return trigger(`autohide${delay}ms`, [
    transition(':enter', [
      style({ opacity: 1 }),
      animate(`300ms ${delay}ms ease-out`, style({ opacity: 0 })),
    ]),
  ]);
};
