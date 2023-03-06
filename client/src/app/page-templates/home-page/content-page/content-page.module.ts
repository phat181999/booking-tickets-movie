import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ContentPageComponent } from './content-page.component';
import { DialogModule } from 'primeng/dialog';
import { PopupComponentComponent } from './popup-component/popup-component.component';
import { PopupComponentModule } from './popup-component/popup-component.module';
@NgModule({
  declarations: [ContentPageComponent],
  imports: [
    DialogModule,
    CommonModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    PopupComponentModule,
  ],
  exports: [ContentPageComponent],
})
export class ContentPageModule {}
