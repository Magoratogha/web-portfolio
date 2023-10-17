import { Component, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/core/services';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
  constructor(private bgService: BackgroundService) {}

  ngOnInit(): void {
    this.bgService.setMiddleView();
  }
}
