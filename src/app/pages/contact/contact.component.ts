import { Component, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/core/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private bgService: BackgroundService) {}

  ngOnInit(): void {
    this.bgService.setMiddleView2();
  }
}
