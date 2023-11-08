import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TimelineItem } from 'src/app/models';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements AfterViewInit {
  @Input() timeLineData: TimelineItem[] | undefined;
  @Output() sectionChanged = new EventEmitter<string>();

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(this.onIntersection.bind(this), {
      root: null,
      rootMargin: `-${window.innerHeight * 0.25}px 0px 0px 0px`,
      threshold: [0.5, 1],
    });
    this.timeLineData?.map((section) => {
      observer.observe(document.getElementById(section.hastag) as HTMLElement);
    });
  }

  onIntersection(entries: IntersectionObserverEntry[]): void {
    const active = entries.reduce((acc, val) => {
      return acc.intersectionRatio > val.intersectionRatio ? acc : val;
    });
    if (active.isIntersecting) {
      this.sectionChanged.emit(active.target.id);
    }
  }
}
