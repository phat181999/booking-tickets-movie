import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPageComponent } from './tab-page.component';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { PopupComponentModule } from '../content-page/popup-component/popup-component.module';
@NgModule({
  declarations: [TabPageComponent],
  exports: [TabPageComponent],
  imports: [CommonModule, TabViewModule, CarouselModule, PopupComponentModule],
})
export class TabModuleModule {}
