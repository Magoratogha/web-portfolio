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
      import('./modules/home/home-routing.module').then(
        (m) => m.HomeRoutingModule
      ),
  },
  {
    path: ABOUT_ROUTE,
    loadChildren: () =>
      import('./modules/about-me/about-me-routing.module').then(
        (m) => m.AboutMeRoutingModule
      ),
  },
  {
    path: SKILLS_ROUTE,
    loadChildren: () =>
      import('./modules/skills/skills-routing.module').then(
        (m) => m.SkillsRoutingModule
      ),
  },
  {
    path: CONTACT_ROUTE,
    loadChildren: () =>
      import('./modules/contact/contact-routing.module').then(
        (m) => m.ContactRoutingModule
      ),
  },
  { path: '', redirectTo: '/' + HOME_ROUTE, pathMatch: 'full' },
  { path: '**', redirectTo: '/' + HOME_ROUTE, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
