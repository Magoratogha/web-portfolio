import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AboutMeComponent } from './about-me/about-me/about-me.component';
import { SkillsComponent } from './skills/skills/skills.component';
import { ContactComponent } from './contact/contact/contact.component';
import { ScrollService } from './shared/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuComponent,
    HomeComponent,
    AboutMeComponent,
    SkillsComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('cursor') cursor!: ElementRef;
  private unlistenMousemoveFn: Function | undefined;

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.scrollService.initScroll(
      document.querySelector('[data-scroll-container]') as HTMLElement
    );
  }

  ngAfterViewInit(): void {
    this.unlistenMousemoveFn = this.renderer.listen(
      document,
      'mousemove',
      this.onMouseMove.bind(this)
    );
    this.setHoverableItems();
  }

  private onMouseMove($event: MouseEvent): void {
    let x = $event.clientX;
    let y = $event.clientY;
    this.renderer.setStyle(this.cursor.nativeElement, 'left', x - 12 + 'px');
    this.renderer.setStyle(this.cursor.nativeElement, 'top', y - 12 + 'px');
  }

  private setMouseEnter(): void {
    this.renderer.addClass(this.cursor.nativeElement, 'hover');
  }

  private setMouseLeave(): void {
    this.renderer.removeClass(this.cursor.nativeElement, 'hover');
  }

  private setHoverableItems(): void {
    const elements = document.getElementsByClassName(
      'hoverable'
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < elements.length; i++) {
      elements[i].onmouseover = this.setMouseEnter.bind(this);
      elements[i].onmouseout = this.setMouseLeave.bind(this);
    }
  }

  onMenuToggle(isOpen: boolean): void {
    if (isOpen) {
      this.changeDetectorRef.detectChanges();
      this.setHoverableItems();
    }
  }

  ngOnDestroy(): void {
    this.unlistenMousemoveFn && this.unlistenMousemoveFn();
  }
}
