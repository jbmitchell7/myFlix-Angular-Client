import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieSynopsisComponent } from './movie-synopsis/movie-synopsis.component';
import { DirectorSynopsisComponent } from './director-synopsis/director-synopsis.component';
import { GenreSynopsisComponent } from './genre-synopsis/genre-synopsis.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const username = localStorage.getItem('user');

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: `users/${username}`, component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginComponent,
    MovieCardComponent,
    WelcomePageComponent,
    MovieSynopsisComponent,
    DirectorSynopsisComponent,
    GenreSynopsisComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
