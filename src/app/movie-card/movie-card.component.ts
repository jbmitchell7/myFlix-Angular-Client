import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { DirectorSynopsisComponent } from '../director-synopsis/director-synopsis.component';
import { GenreSynopsisComponent } from '../genre-synopsis/genre-synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  addToFavorites(movie: any): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.addFavorite(user, movie).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open('Added to Favorites.', 'OK', {
        duration: 1000
      });
    })
  }

  removeFromFavorites(movie: any): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.removeFavorite(user, movie).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open('Removed from Favorites.', 'OK', {
        duration: 1000
      });
    })
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
