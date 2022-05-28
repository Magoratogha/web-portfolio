import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  EventEmitter,
  Input,
  OnDestroy
} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('aboutContainer') aboutContainer: ElementRef | undefined;
  @Output() componentResized = new EventEmitter<number>();
  @Input() public componentsHeightChanged: EventEmitter<void> | undefined;
  public currentAge = 0;
  public isPDFDownloading = false;
  private resizeUnlistenerFn: Function = () => {};

  constructor(private renderer: Renderer2) {
    const currentDate = moment();
    const birthdayDate = moment('1997-07-08');
    this.currentAge = currentDate.diff(birthdayDate, 'years');
  }

  ngOnInit(): void {
    this.componentsHeightChanged?.subscribe(() => {
      this.onWindowResize();
    });
  }

  ngAfterViewInit(): void {
    this.onWindowResize();
    this.resizeUnlistenerFn = this.renderer.listen(window, 'resize', this.onWindowResize.bind(this));
  }

  private onWindowResize(): void {
    this.renderer.setStyle(this.aboutContainer?.nativeElement, 'bottom',
      'calc(100vh - ' + this.aboutContainer?.nativeElement.getBoundingClientRect().height + 'px)');
    this.componentResized.emit(Math.floor(document.documentElement.offsetHeight));
  }

  public downloadPDF(pdfFile: string, pdfName: string): void {
    this.isPDFDownloading = true;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './assets/pdfs/' + pdfFile);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const file = new File([xhr.response], pdfName, { type: 'data:application/pdf' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = pdfName;
      downloadLink.click();
      this.isPDFDownloading = false;
    };
    xhr.send();
  }

  public onImageLoad(): void {
    this.componentsHeightChanged?.emit();
  }

  ngOnDestroy(): void {
    this.componentsHeightChanged?.unsubscribe();
    this.resizeUnlistenerFn();
  }

}
