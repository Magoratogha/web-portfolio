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

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.viewportHeight = window.innerHeight;
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('window:scroll') onScroll(): void {
    this.currentScrollPosition = window.pageYOffset;
    this.currentSection = Math.floor(this.currentScrollPosition / this.viewportHeight);
  }
}
