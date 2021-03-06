import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('inOutAnimation', [
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
  @Input() public componentsPositions: number[] = [];
  // @ts-ignore
  @ViewChild('headerToggler') headerTogglerRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  public scrollToSection(section: number): void {
    this.collapseHeader();
    window.scrollTo({ top: this.componentsPositions[section], behavior: 'smooth' });
  }

  private collapseHeader(): void {
    if (this.headerTogglerRef.nativeElement.offsetParent !== null) {
      this.headerTogglerRef.nativeElement.click();
    }
  }

  public getSectionIconClass(): string {
    switch (this.currentSection) {
      case 1:
        return 'bi-person';
      case 2:
        return 'bi-briefcase';
      case 3:
        return 'bi-send';
      default:
        return '';
    }
  }   
}
