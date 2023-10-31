import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutMeRoutingModule } from './about-me-routing.module';
import { AboutMeComponent } from './about-me.component';
import { ItemDetailsComponent } from './components';

@NgModule({
  declarations: [AboutMeComponent, ItemDetailsComponent],
  imports: [CommonModule, AboutMeRoutingModule],
})
export class AboutMeModule {}
