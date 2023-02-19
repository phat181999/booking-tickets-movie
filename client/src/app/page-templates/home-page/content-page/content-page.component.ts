import { Component } from '@angular/core';
import { Product } from '../../entity/home/content-page';
@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
})
export class ContentPageComponent {
  products: Product[];

  ngOnInit() {}
}
