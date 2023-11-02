import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ABOUT_ME_ROUTE,
  ABOUT_WORK_ROUTE,
  ME_DETAILS,
  WORK_DETAILS,
} from 'src/app/constants';
import { AboutMeComponent } from './about-me.component';
import { ItemDetailsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AboutMeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ABOUT_ME_ROUTE,
      },
      {
        path: ABOUT_ME_ROUTE,
        component: ItemDetailsComponent,
        data: ME_DETAILS,
      },
      {
        path: ABOUT_WORK_ROUTE,
        component: ItemDetailsComponent,
        data: WORK_DETAILS,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutMeRoutingModule {}
