import {AfterViewInit, ChangeDetectorRef, Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  public viewportHeight = 0;
  public currentScrollPosition = 0;
  public currentSection = 0;
  public componentsPositions: number[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.viewportHeight = window.innerHeight;
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('window:scroll')
  private onScroll(): void {
    this.currentScrollPosition = window.pageYOffset;
    this.currentSection = this.componentsPositions.findIndex(((value, index) => {
      return this.componentsPositions[index + 1] ? (this.currentScrollPosition >= value &&
        this.currentScrollPosition < this.componentsPositions[index + 1]) :
          this.currentScrollPosition >= value;
    }));
  }

  public onComponentResize(componentPosition: number, componentIndex: number): void {
    this.componentsPositions[componentIndex] = componentPosition;
  }
}
