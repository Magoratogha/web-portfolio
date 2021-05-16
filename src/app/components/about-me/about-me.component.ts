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
}
