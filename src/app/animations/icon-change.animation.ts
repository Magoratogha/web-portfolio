import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const IconChange = trigger('iconChange', [
  transition(
    '* <=> *',
    animate(
      '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      keyframes([
        style({ opacity: 0, transform: 'translateY(10px)' }),
        style({ opacity: 1, transform: 'translateY(0)' }),
      ])
    )
  ),
]);
