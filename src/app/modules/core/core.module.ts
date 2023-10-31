import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, MainLoaderComponent } from './components';

@NgModule({
  declarations: [HeaderComponent, MainLoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, MainLoaderComponent],
})
export class CoreModule {}
