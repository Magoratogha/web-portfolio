import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('componentContainer') componentContainer: ElementRef | undefined;
  @Output() componentResized = new EventEmitter<number>();
  @Input() public componentsHeightChanged: EventEmitter<void> | undefined;
  public workingExperienceAges = 0;
  private resizeUnlistenerFn: Function = () => {};

  constructor(private renderer: Renderer2) {
    const currentDate = moment();
    const startWorkingDate = moment('2018-02');
    this.workingExperienceAges = currentDate.diff(startWorkingDate, 'years');
  }

  ngOnInit(): void {
    this.componentsHeightChanged?.subscribe(() => {
      this.onWindowResize();
    });
  }

  ngAfterViewInit(): void {
    this.onWindowResize();
    this.resizeUnlistenerFn = this.renderer.listen(
      window,
      'resize',
      this.onWindowResize.bind(this)
    );
  }

  private onWindowResize(): void {
    this.componentResized.emit(
      Math.floor(
        this.componentContainer?.nativeElement.getBoundingClientRect().top +
          window.scrollY -
          document.documentElement.offsetHeight
      )
    );
  }

  public onImageLoad(): void {
    window.dispatchEvent(new Event('resize'));
    this.componentsHeightChanged?.emit();
  }

  ngOnDestroy(): void {
    this.componentsHeightChanged?.unsubscribe();
    this.resizeUnlistenerFn();
  }
}
