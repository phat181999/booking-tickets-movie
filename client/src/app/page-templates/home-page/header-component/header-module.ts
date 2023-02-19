import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { HeaderComponentComponent } from './header-component.component';
@NgModule({
  declarations: [HeaderComponentComponent],
  imports: [CommonModule, MenubarModule, InputTextModule, ButtonModule],
  exports: [HeaderComponentComponent],
})
export class HeaderModuleModule {}
