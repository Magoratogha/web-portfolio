import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  EventEmitter,
  Input,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('aboutContainer') aboutContainer: ElementRef | undefined;
  @Output() componentResized = new EventEmitter<number>();
  @Input() public componentsHeightChanged: EventEmitter<void> | undefined;

  constructor(private renderer: Renderer2) { }

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
    this.renderer.setStyle(this.aboutContainer?.nativeElement, 'bottom',
      'calc(100vh - ' + this.aboutContainer?.nativeElement.getBoundingClientRect().height + 'px)');
    this.componentResized.emit(Math.floor(document.documentElement.offsetHeight));
  }

  public downloadPDF(pdfFile: string, pdfName: string): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './assets/pdfs/' + pdfFile);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const file = new File([xhr.response], pdfName, { type: 'data:application/pdf' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = pdfName;
      downloadLink.click();
    };
    xhr.send();
  }

  public onImageLoad(): void {
    this.componentsHeightChanged?.emit();
  }

  ngOnDestroy(): void {
    this.componentsHeightChanged?.unsubscribe();
  }

}
