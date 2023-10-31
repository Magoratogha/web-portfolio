import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../core/services';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  constructor(private bgService: BackgroundService) {}

  ngOnInit(): void {
    this.bgService.setPanoramicView();
  }
}
