import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from '../../../entity/home/content-page';
import { MovieService } from '../../../services/data/movie-services';
import { notifyUnsubsrice } from 'src/app/midlleware/notifyUnsubsrice';
@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-button {
        margin: 0 0.5rem 0 0;
        min-width: 10rem;
      }

      p {
        margin: 0;
      }

      .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }

      :host ::ng-deep .p-dialog .p-button {
        min-width: 6rem;
      }
    `,
  ],
})
export class ContentPageComponent {
  movies: Movie[];
  responsiveOptions;
  unsubscribe$: Subject<any> = new Subject();
  display: boolean = false;

  constructor(private movieService: MovieService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnChanges() {
    this.showDialog();
    console.log(this.display, 'display');
  }

  ngOnInit() {
    this.getMovie();
  }

  ngDestroy() {
    notifyUnsubsrice(this.unsubscribe$);
  }

  getMovie() {
    this.movieService
      .getMovieService()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        return (this.movies = data);
      });
  }

  showDialog() {
    this.display = !this.display;
  }
}
