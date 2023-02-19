import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { ContentPageComponent } from './content-page.component';
@NgModule({
  declarations: [ContentPageComponent],
  imports: [CommonModule, CarouselModule, ButtonModule, ToastModule],
  exports: [ContentPageComponent],
})
export class ContentPageModule {}
