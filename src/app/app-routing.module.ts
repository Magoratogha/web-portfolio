import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  HOME_ROUTE,
  SKILLS_ROUTE,
} from './constants';

const routes: Routes = [
  {
    path: HOME_ROUTE,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: ABOUT_ROUTE,
    loadChildren: () =>
      import('./modules/about-me/about-me.module').then((m) => m.AboutMeModule),
  },
  {
    path: SKILLS_ROUTE,
    loadChildren: () =>
      import('./modules/skills/skills.module').then((m) => m.SkillsModule),
  },
  {
    path: CONTACT_ROUTE,
    loadChildren: () =>
      import('./modules/contact/contact.module').then((m) => m.ContactModule),
  },
  { path: '', redirectTo: '/' + HOME_ROUTE, pathMatch: 'full' },
  { path: '**', redirectTo: '/' + HOME_ROUTE, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
