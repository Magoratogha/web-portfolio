export const LOCAL_PERFORMANCE_RATIO = 1;
export const EMAIL_SEND_ENDPOINT = 'https://sendmail-rw2hwhriua-uc.a.run.app/';
export const EMAIL_SUBJECT = 'Contact from Web Portfolio';
export const DARK_BG_COLOR = '#0d0d0d';
export const LIGHT_BG_COLOR = '#f2f2f2';
export const MOBILE_SCREEN_MAX_WIDTH = 786;
export const SMALL_MOBILE_SCREEN_MAX_WIDTH = 576;
export const IS_MOBILE_DEVICE = () =>
  matchMedia(`(max-width: ${MOBILE_SCREEN_MAX_WIDTH}px)`).matches;
export const IS_SMALL_MOBILE_DEVICE = () =>
  matchMedia(`(max-width: ${SMALL_MOBILE_SCREEN_MAX_WIDTH}px)`).matches;
export const IS_TOUCH_DEVICE = () =>
  !!(window.navigator.maxTouchPoints || 'ontouchstart' in document);
export const BG_ANIMATION_TIME = 1.5;
export const BG_ANIMATION_EASE = 'power3.inOut';
export const BG_DARK_OPACITY = 0.55;
export const BG_LIGHT_OPACITY = 1.25;
export const PARTICLES_CONFIG = [
  {
    minRadius: 0.2,
    maxRadius: IS_MOBILE_DEVICE() ? 1.2 : 1.5,
    colorLight: '#aac9d4',
    size: IS_MOBILE_DEVICE() ? 1.2 : 1,
    apm: 0.2,
    color: '#88b3c3',
  },
  {
    minRadius: 0.2,
    maxRadius: IS_MOBILE_DEVICE() ? 1.2 : 1.5,
    colorLight: '#b7b7b7',
    size: IS_MOBILE_DEVICE() ? 1 : 0.7,
    apm: 0.6,
    color: '#ffffff',
  },
];
export const LINKEDIN_URL = 'https://www.linkedin.com/in/magoratogha';
export const GITHUB_URL = 'https://github.com/Magoratogha';
export const INSTAGRAM_URL = 'https://www.instagram.com/magoratogha';
export const FACEBOOK_URL = 'https://www.facebook.com/Magoratoga';
