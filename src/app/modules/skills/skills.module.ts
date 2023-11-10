import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [SkillsComponent],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class SkillsModule {}
