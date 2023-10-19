import { Component, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private bgService: BackgroundService) {}

  ngOnInit(): void {
    this.bgService.setInmerseView();
  }
}
