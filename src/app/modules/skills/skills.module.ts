import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';

@NgModule({
  declarations: [SkillsComponent],
  imports: [CommonModule, SkillsRoutingModule],
})
export class SkillsModule {}
