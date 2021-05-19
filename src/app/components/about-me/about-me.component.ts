import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, AfterViewInit {

  @ViewChild('aboutContainer') aboutContainer: ElementRef | undefined;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.aboutContainer?.nativeElement, 'bottom',
      'calc(100% - ' + this.aboutContainer?.nativeElement.offsetHeight + 'px)');
  }

  @HostListener('window:resize') onWindowResize(): void {
    this.renderer.setStyle(this.aboutContainer?.nativeElement, 'bottom',
      'calc(100% - ' + this.aboutContainer?.nativeElement.offsetHeight + 'px)');
  }

  public downloadPDF(pdfFile: string, pdfName: string): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/pdfs/' + pdfFile);
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
}
