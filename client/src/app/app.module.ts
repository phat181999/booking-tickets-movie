import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PageTemplatesModule } from './page-templates/page-templates/page-templates.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, PageTemplatesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
