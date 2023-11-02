import { AboutMeItemDetails } from '../models';

const YEAR_IN_MS = 31536000000;
const startWorkingDate = new Date('2018-02-01T00:00:00');
const workingYears = Math.floor(
  (Date.now() - startWorkingDate.getTime()) / YEAR_IN_MS
);

export const ME_DETAILS: AboutMeItemDetails = {
  description: `My name is Santiago and I'm a <b class="hoverable">software development engineer with ${workingYears}+ years</b> of experience.<br><br> I'm a <b class="hoverable">FrontEnd</b> specialist and I've had the chance to work with an extensive variety of projects, from small <b class="hoverable">startups</b> to big <b class="hoverable">enterprice companies.</b>`,
  iconName: 'made-in-colombia',
  timeline: false,
};

export const WORK_DETAILS: AboutMeItemDetails = {
  timeline: true,
  timelineItems: [
    {
      starting: true,
      ending: false,
      hastag: 'globant',
      items: ['', ''],
    },
    { starting: false, ending: false, hastag: 'vcsoft', items: ['', ''] },
    { starting: false, ending: true, hastag: 'freelance', items: [''] },
  ],
};