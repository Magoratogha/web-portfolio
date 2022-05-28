import {AfterViewInit, Component, EventEmitter, OnDestroy, Output, Renderer2} from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements AfterViewInit, OnDestroy {

  private resizeUnlistenerFn: Function = () => {};
  @Output() componentResized = new EventEmitter<number>();

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.onWindowResize();
    this.resizeUnlistenerFn = this.renderer.listen(window, 'resize', this.onWindowResize.bind(this));
  }

  private onWindowResize(): void {
    this.componentResized.emit(0);
  }

  public scrollToAboutPage(): void {
    window.scrollTo({ top: document.documentElement.offsetHeight, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.resizeUnlistenerFn();
  }
}
