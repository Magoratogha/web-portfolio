import { Component, Input } from '@angular/core';
import { AutoHide } from '../../../../animations';

@Component({
  selector: 'app-main-loader',
  templateUrl: './main-loader.component.html',
  styleUrls: ['./main-loader.component.scss'],
  animations: [AutoHide(1550), AutoHide(1625), AutoHide(1700)],
})
export class MainLoaderComponent {
  @Input() show: boolean = true;
}
