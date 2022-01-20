import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { DirectorSynopsisComponent } from '../director-synopsis/director-synopsis.component';
import { GenreSynopsisComponent } from '../genre-synopsis/genre-synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openMovieSynopsisDialog(title: string, description: string, image: string, director: string, genre: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { title: title, description: description, image: image, director: director, genre: genre },
      width: '300px'
    });
  }

  openDirectorDialog(name: string, bio: string, birth: any, death: any): void {
    this.dialog.open(DirectorSynopsisComponent, {
      data: { name: name, bio: bio, birth: birth, death: death },
      width: '300px'
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreSynopsisComponent, {
      data: { name: name, description: description },
      width: '300px'
    });
  }
}
