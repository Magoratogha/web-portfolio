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
      hastag: 'globant',
      title:
        '<b class="hoverable underlined contrast"><a href="https://www.globant.com/" target="_blank">Globant LLC</a></b>',
      subItems: [
        {
          title: '<b>Technical Leader</b>',
          timePeriod: 'October 2022 - Present',
          description:
            'Implementation of incremental features looking for improve the user experience and add application functionalities',
          skills: [
            'Azure DevOps',
            'CI/CD',
            'Angular 2+',
            'TypeScript',
            'JavaScript',
            'RxJS',
            'NxJs',
            'KarmaJS',
            'Jasmine',
            'API REST',
            'HTML',
            'CSS',
            'LESS',
            'C#',
          ],
        },
        {
          title: '<b>SR Web UI Developer</b>',
          timePeriod: 'July 2021 - Present',
          description:
            'Implementation of incremental features looking for improve the user experience and add application functionalities',
          skills: [
            'Angular 2+',
            'TypeScript',
            'JavaScript',
            'KnockoutJS',
            'DurandalJS',
            'KarmaJS',
            'Jasmine',
            'Kendo',
            'API REST',
            'HTML',
            'CSS',
            'LESS',
          ],
        },
      ],
    },
    {
      hastag: 'vcsoft',
      title:
        '<b class="hoverable underlined contrast"><a href="https://www.vc-soft.com/" target="_blank">VC-SOFT</a></b> outsourcing <b class="hoverable underlined contrast"><a href="https://www.bancolombia.com/personas" target="_blank">Grupo Bancolombia</a></b>',
      subItems: [
        {
          title: 'Cloud Frontend Team Lead',
          timePeriod: 'March 2020 - July 2021',
          description:
            'Implementation of incremental features looking for improve the user experience and add application functionalities',
          skills: [
            'AWS',
            'OpenShift',
            'SonarQube',
            'Azure DevOps',
            'Angular 2+',
            'TypeScript',
            'JavaScript',
            'RxJS',
            'HTML',
            'SCSS',
            'Bootstrap',
            'KarmaJS',
            'Jasmine',
          ],
        },
        {
          title: 'Frontend Developer',
          timePeriod: 'February 2019 - March 2020',
          description:
            'Implementation of incremental features looking for improve the user experience and add application functionalities',
          skills: [
            'Angular 2+',
            'TypeScript',
            'JavaScript',
            'RxJS',
            'HTML',
            'SCSS',
            'Angular Material',
            'Angular Flex Layout',
            'Bootstrap',
            'KarmaJS',
            'Jasmine',
            'API REST',
          ],
        },
      ],
    },
    {
      hastag: 'freelance',
      title: '<b>As Frelancer</b>',
      subItems: [
        {
          title: 'Freelance Developer',
          timePeriod: '2018 - 2019',
          description:
            'Implementation of incremental features looking for improve the user experience and add application functionalities',
          skills: [
            'Google Firebase',
            'Angular 2+',
            'IONIC Framework',
            'API REST',
            'Bootstrap',
            'JavaScript',
            'TypeScript',
            'NodeJS',
            'Python',
            'CUDA',
            'C++',
            'OpenCV',
            'Google Speech API',
            'VHDL',
          ],
        },
      ],
    },
  ],
};
