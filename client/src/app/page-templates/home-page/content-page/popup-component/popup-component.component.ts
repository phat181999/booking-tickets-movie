import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/entity/home/content-page';

@Component({
  selector: 'app-popup-component',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.scss'],
})
export class PopupComponentComponent {
  @Input() isOpen: boolean;
  @Input() movies: Movie[];

  ngOnInit() {}
}
