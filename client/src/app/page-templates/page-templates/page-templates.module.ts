import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplatesComponent } from './page-templates.component';
import { HeaderComponentComponent } from '../home-page/header-component/header-component.component';
import { FooterPageComponent } from '../home-page/footer-page/footer-page.component';
import { ContentPageComponent } from '../home-page/content-page/content-page.component';

@NgModule({
  declarations: [
    PageTemplatesComponent,
    HeaderComponentComponent,
    FooterPageComponent,
    ContentPageComponent,
  ],
  imports: [CommonModule],
  exports: [PageTemplatesComponent],
})
export class PageTemplatesModule {}
