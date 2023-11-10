import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrollAnimationDirective } from './directives';

@NgModule({
  declarations: [SkillsComponent, ScrollAnimationDirective],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class SkillsModule {}
