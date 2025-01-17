import { AboutMeItemDetails } from '../models';

const YEAR_IN_MS = 31536000000;
const startWorkingDate = new Date('2018-02-01T00:00:00');
const workingYears = Math.floor(
  (Date.now() - startWorkingDate.getTime()) / YEAR_IN_MS
);

export const ME_DETAILS: AboutMeItemDetails = {
  description: `My name is Santiago and I'm a <b>software development engineer with ${workingYears}+ years</b> of experience.<br><br> I'm a <b>front-end</b> specialist and I've had the chance to work with an extensive variety of projects, from small <b>startups</b> to big <b>enterprise companies.</b>`,
  iconName: 'made-in-colombia',
  timeline: false,
};

export const WORK_DETAILS: AboutMeItemDetails = {
  timeline: true,
  timelineItems: [
    {
      hashtag: 'unosquare',
      key: 'Unosquare',
      activityTime: 'December 2023 - <b>Present</b>',
      title:
        '<b class="hoverable underlined contrast"><a href="https://www.unosquare.com/" target="_blank">Unosquare</a></b> outsourcing <b class="hoverable underlined contrast"><a href="https://gtreasury.com/" target="_blank">GTreasury</a></b>',
      subItems: [
        {
          title: '<b>Senior Angular Developer</b>',
          timePeriod: 'December 2023 - <b>Present</b>',
          description:
            '<p>Frontend developer in charge of migrate the legacy design styles of different tech base projects (ASP.NET, Angular, Aurelia, etc) to a new modern design system using Sass as a CSS pre-processor.</p><p>Implementing an Angular library for reuse custom business components into different Angular apps. It was also packed as Web Elements to be used in non-Angular projects.</p>',
          skills: [
            'Azure DevOps',
            'CI/CD',
            'Angular 2+',
            'TypeScript',
            'JavaScript',
            'Storybook',
            'Kendo UI',
            'RxJS',
            'KarmaJS',
            'Figma',
            'GulpJS',
            'Jasmine',
            'HTML',
            'SCSS',
            'Aurelia',
          ],
        },
      ],
    },
    {
      hashtag: 'globant',
      key: 'Globant',
      activityTime: 'July 2021 - December 2023',
      title:
        '<b class="hoverable underlined contrast"><a href="https://www.globant.com/" target="_blank">Globant LLC</a></b> outsourcing <b class="hoverable underlined contrast"><a href="https://www2.deloitte.com/" target="_blank">Deloitte</a></b>',
      subItems: [
        {
          title: '<b>Technical Leader</b>',
          timePeriod: 'October 2022 - December 2023',
          description:
            'Technical team leader responsible for establishing guidelines and good practices for the development process and the definition of the applications architecture.',
          skills: [
            'Leadership',
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
          ],
        },
        {
          title: '<b>Senior Web UI Developer</b>',
          timePeriod: 'July 2021 - December 2023',
          description:
            '<p>Web UI Developer in charge of the implementation of incremental features in existent and new applications using agile methodologies.</p><p>Support and migration of legacy web applications to newer technologies.</p>',
          skills: [
            'Angular 2+',
            'TypeScript',
            'JavaScript',
            'KnockoutJS',
            'DurandalJS',
            'KarmaJS',
            'Jasmine',
            'Kendo',
            'SAFe',
            'HTML',
            'CSS',
            'LESS',
          ],
        },
      ],
    },
    {
      hashtag: 'vcsoft',
      key: 'VC@Soft',
      activityTime: 'February 2019 - July 2021',
      title:
        '<b class="hoverable underlined contrast"><a href="https://www.vc-soft.com/" target="_blank">VC-SOFT</a></b> outsourcing <b class="hoverable underlined contrast"><a href="https://www.bancolombia.com/personas" target="_blank">Grupo Bancolombia</a></b>',
      subItems: [
        {
          title: '<b>Cloud Frontend Team Lead</b>',
          timePeriod: 'March 2020 - July 2021',
          description:
            '<p>Frontend development team leader responsible for establishing guidelines and good practices for the technical team.</p><p>DevOps analyst for infrastructures built on OpenShift and AWS. Support of applications in a productive environment under the Standby model.</p>',
          skills: [
            'Leadership',
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
          title: '<b>Frontend Developer</b>',
          timePeriod: 'February 2019 - March 2020',
          description:
            'Frontend software developer focused on the implementation of incremental features for existing projects and the development of new applications using agile methodologies.',
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
            'Scrum',
          ],
        },
      ],
    },
    {
      hashtag: 'freelance',
      key: 'As freelancer',
      title: '<b>As Frelancer</b>',
      activityTime: 'February 2018 - February 2019',
      subItems: [
        {
          title: '<b>Freelance Developer</b>',
          timePeriod: '2018 - 2019',
          description:
            'Independent freelance developer focused on frontend and mobile development for different projects with different needs.',
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
