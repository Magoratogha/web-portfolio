import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('componentContainer') componentContainer: ElementRef | undefined;
  @Output() componentResized = new EventEmitter<number>();
  @Input() public componentsHeightChanged: EventEmitter<void> | undefined;
  public workingExperienceAges = 0;

  constructor() {
    const currentDate = new Date();
    const startWorkingDate = new Date('2018-2-1');
    const differenceDays = Math.ceil((Number(currentDate) - Number(startWorkingDate)) / (1000 * 60 * 60 * 24));
    this.workingExperienceAges = Math.floor(differenceDays / 365);
  }

  ngOnInit(): void {
    this.componentsHeightChanged?.subscribe(() => {
      this.onWindowResize();
    });
  }

  ngAfterViewInit(): void {
    this.onWindowResize();
  }

  @HostListener('window:resize')
  private onWindowResize(): void {
    this.componentResized.emit(Math.floor(this.componentContainer?.nativeElement.getBoundingClientRect().top +
      window.scrollY - document.documentElement.offsetHeight));
  }

  public onImageLoad(): void {
    this.componentsHeightChanged?.emit();
  }

  ngOnDestroy(): void {
    this.componentsHeightChanged?.unsubscribe();
  }

}
