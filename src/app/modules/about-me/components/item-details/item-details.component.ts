
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { AboutMeItemDetails } from 'src/app/models';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  standalone: true,
  imports: [MatIcon, TimelineComponent],
})
export class ItemDetailsComponent implements OnInit {
  public detailsData: AboutMeItemDetails | undefined;
  @Output() sectionChanged = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.detailsData = this.route.snapshot.data as AboutMeItemDetails;
  }
}
