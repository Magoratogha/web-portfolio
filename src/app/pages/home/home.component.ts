import { Component, OnInit } from '@angular/core';
import { ABOUT_ROUTE, SKILLS_ROUTE } from 'src/app/core/constants';
import { BackgroundService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ABOUT_ROUTE = ABOUT_ROUTE;
  SKILLS_ROUTE = SKILLS_ROUTE;

  constructor(private bgService: BackgroundService) {}

  ngOnInit(): void {
    this.bgService.setInmerseView();
  }
}
