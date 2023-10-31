import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ABOUT_FREELANCE_ROUTE,
  ABOUT_GLOBANT_ROUTE,
  ABOUT_ME_ROUTE,
  ABOUT_VCSOFT_ROUTE,
  FREELANCE_DETAILS,
  GLOBANT_DETAILS,
  ME_DETAILS,
  VC_SOFT_DETAILS,
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
        path: ABOUT_GLOBANT_ROUTE,
        component: ItemDetailsComponent,
        data: GLOBANT_DETAILS,
      },
      {
        path: ABOUT_VCSOFT_ROUTE,
        component: ItemDetailsComponent,
        data: VC_SOFT_DETAILS,
      },
      {
        path: ABOUT_FREELANCE_ROUTE,
        component: ItemDetailsComponent,
        data: FREELANCE_DETAILS,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutMeRoutingModule {}
