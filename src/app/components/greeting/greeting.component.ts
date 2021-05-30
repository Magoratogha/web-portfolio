import {AfterViewInit, Component, EventEmitter, HostListener, Output} from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements AfterViewInit {

  @Output() componentResized = new EventEmitter<number>();

  constructor() { }

  ngAfterViewInit(): void {
    this.onWindowResize();
  }

  @HostListener('window:resize')
  private onWindowResize(): void {
    this.componentResized.emit(0);
  }

  public scrollToAboutPage(): void {
    window.scrollTo({ top: document.documentElement.offsetHeight, behavior: 'smooth' });
  }

}
