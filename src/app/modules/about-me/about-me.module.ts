import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutMeRoutingModule } from './about-me-routing.module';
import { AboutMeComponent } from './about-me.component';
import { ItemDetailsComponent } from './components';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AboutMeComponent, ItemDetailsComponent],
  imports: [CommonModule, AboutMeRoutingModule, MatIconModule],
})
export class AboutMeModule {}
