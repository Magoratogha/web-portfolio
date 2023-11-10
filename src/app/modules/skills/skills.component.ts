import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackgroundService } from '../core/services';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit, OnDestroy {
  constructor(private bgService: BackgroundService) {}

  ngOnInit(): void {
    this.bgService.setPanoramicView();
  }

  onCheckboxChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.bgService.activateGlitchEffect();
    } else {
      this.bgService.deactivateGlitchEffect();
    }
  }

  ngOnDestroy(): void {
    this.bgService.deactivateGlitchEffect();
  }
}
