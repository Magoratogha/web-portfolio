import { Component, Input } from '@angular/core';
import { TimelineItem } from 'src/app/models';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  @Input() timeLineData: TimelineItem[] | undefined;
}
