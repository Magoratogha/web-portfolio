import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AboutMeComponent,
  ContactComponent,
  HomeComponent,
  SkillsComponent,
} from './pages';
import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  HOME_ROUTE,
  SKILLS_ROUTE,
} from './core/constants';

const routes: Routes = [
  { path: HOME_ROUTE, component: HomeComponent },
  { path: ABOUT_ROUTE, component: AboutMeComponent },
  { path: SKILLS_ROUTE, component: SkillsComponent },
  { path: CONTACT_ROUTE, component: ContactComponent },
  { path: '', redirectTo: '/' + HOME_ROUTE, pathMatch: 'full' },
  { path: '**', redirectTo: '/' + HOME_ROUTE, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
