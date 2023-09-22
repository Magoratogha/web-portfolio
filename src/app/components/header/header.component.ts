import { Component, Input } from '@angular/core';
import {
  HorizontalStagger,
  IconChange,
  InEaseIn,
  SmallToBold,
  VerticalStagger,
} from 'src/app/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    InEaseIn,
    SmallToBold,
    IconChange,
    VerticalStagger,
    HorizontalStagger,
  ],
})
export class HeaderComponent {
  @Input() public currentSection = 0;
  @Input() public componentsPositions: number[] = [];
  public isExpanded: boolean = false;
  public sections: any[] = [
    { label: 'Contact', iconName: 'send', sectionNumber: 3 },
    { label: 'My skills', iconName: 'work', sectionNumber: 2 },
    { label: 'About me', iconName: 'face', sectionNumber: 1 },
    { label: 'Home', iconName: 'home', sectionNumber: 0 },
  ];
  public links: any[] = [
    { url: 'https://www.facebook.com/Magoratoga', iconName: 'facebook' },
    { url: 'https://www.instagram.com/magoratogha', iconName: 'instagram' },
    { url: 'https://www.linkedin.com/in/magoratogha', iconName: 'linkedin' },
    { url: 'https://github.com/Magoratogha', iconName: 'github' },
  ];

  constructor() {}

  public scrollToSection(section: number): void {
    window.scrollTo({
      top: this.componentsPositions[section],
      behavior: 'smooth',
    });
  }

  public getSectionIconClass(bold?: boolean): string {
    return this.isExpanded
      ? 'close'
      : this.sections.find(
          (section) => section.sectionNumber === this.currentSection
        )?.iconName + (bold ? '-bold' : '');
  }
}
