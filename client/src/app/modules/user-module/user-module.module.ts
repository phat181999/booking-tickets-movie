import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageModule } from 'src/app/page-templates/home-page/home-page/home-page.module';
import { MenuItem } from 'primeng/api';
@NgModule({
  declarations: [],
  imports: [CommonModule, HomePageModule],
})
export class UserModuleModule {}
