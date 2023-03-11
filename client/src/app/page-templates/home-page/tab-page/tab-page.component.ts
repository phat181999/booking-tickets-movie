import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/entity/home/content-page';
import { notifyUnsubsrice } from 'src/app/midlleware/notifyUnsubsrice';
import { MovieService } from 'src/app/services/data/movie-services';

@Component({
  selector: 'app-tab-cpmponent',
  templateUrl: './tab-cpmponent.component.html',
  styleUrls: ['./tab-page.component.scss'],
})
export class TabPageComponent {
  movies: Movie[];
  display: boolean;
  unsubscribe$: Subject<any> = new Subject();
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getNowShowing();
  }

  ngDestroy() {
    notifyUnsubsrice(this.unsubscribe$);
  }

  getNowShowing() {
    this.movieService.getMovieNow().subscribe((data) => {
      return (this.movies = data);
    });
  }
}
