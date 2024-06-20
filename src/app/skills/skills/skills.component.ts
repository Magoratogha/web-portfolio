import { Component } from '@angular/core';
import { PageTags } from '../../shared/enums';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  public pageTag = PageTags.SKILLS;
} 
