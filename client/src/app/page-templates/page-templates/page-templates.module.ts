import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplatesComponent } from './page-templates.component';
import { HeaderModuleModule } from '../home-page/header-component/header-module';
import { ContentPageModule } from '../home-page/content-page/content-page.module';
import { PopupComponentModule } from '../home-page/content-page/popup-component/popup-component.module';
@NgModule({
  declarations: [PageTemplatesComponent],
  imports: [CommonModule, HeaderModuleModule, ContentPageModule],
  exports: [PageTemplatesComponent],
})
export class PageTemplatesModule {}
