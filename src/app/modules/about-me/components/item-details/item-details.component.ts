import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutMeItemDetails } from 'src/app/models';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  public detailsData: AboutMeItemDetails | undefined;
  @Output() sectionChanged = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.detailsData = this.route.snapshot.data as AboutMeItemDetails;
  }
}
