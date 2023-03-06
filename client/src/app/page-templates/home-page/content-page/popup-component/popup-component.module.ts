import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PopupComponentComponent } from './popup-component.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [PopupComponentComponent],
  imports: [CommonModule, DialogModule, ButtonModule],
  exports: [PopupComponentComponent],
})
export class PopupComponentModule {}
