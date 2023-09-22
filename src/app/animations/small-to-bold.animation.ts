import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SmallToBold = trigger('smallToBold', [
  state(
    'true',
    style({
      'font-size': '1em',
      'font-weight': 'bold',
    })
  ),
  state(
    'false',
    style({
      'font-size': '0.875em',
      'font-weight': 'normal',
    })
  ),
  transition('false => true', [animate('100ms ease-in')]),
  transition('true => false', [animate('100ms ease-out')]),
]);
