import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('InOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  @Input() public currentSection = 0;
  @Input() public viewportHeight = 0;
  // @ts-ignore
  @ViewChild('headerToggler') headerTogglerRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  public scrollToSection(section: number): void {
    this.collapseHeader();
    window.scrollTo({ top: section * this.viewportHeight, behavior: 'smooth' });
  }

  private collapseHeader(): void {
    if (this.headerTogglerRef.nativeElement.offsetParent !== null) {
      this.headerTogglerRef.nativeElement.click();
    }
  }

}
