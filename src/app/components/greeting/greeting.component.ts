import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { In1500ms, In3000ms, In4500ms, InEaseIn } from 'src/app/animations';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
  animations: [InEaseIn, In1500ms, In3000ms, In4500ms],
})
export class GreetingComponent implements AfterViewInit, OnDestroy {
  private resizeUnlistenerFn: Function = () => {};
  @Output() componentResized = new EventEmitter<number>();

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.onWindowResize();
    this.resizeUnlistenerFn = this.renderer.listen(
      window,
      'resize',
      this.onWindowResize.bind(this)
    );
  }

  private onWindowResize(): void {
    this.componentResized.emit(0);
  }

  public scrollToAboutPage(): void {
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.resizeUnlistenerFn();
  }
}
