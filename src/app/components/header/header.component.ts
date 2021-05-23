import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
  trigger('InOutAnimation', [
    state('hidden', style({ opacity: '0' })),
    state('shown', style({ opacity: '1' })),
    transition('hidden => shown', [
      animate('0.2s ease-in')
    ]),
    transition('shown => hidden', [
      animate('0.2s ease-out')
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

}
