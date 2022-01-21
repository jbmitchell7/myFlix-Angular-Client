import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  favorites: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  backToMovies(): void {
    this.router.navigate(['movies']);
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  dateConvert(dateInput: any) {
    let year = dateInput.substr(0, 4);
    let month = dateInput.substr(5, 2);
    let day = dateInput.substr(8, 2);
    let date = `${month}-${day}-${year}`;
    return date
  }

  getUserProfile(): void {
    this.fetchApiData.getUser(localStorage.getItem('user')).subscribe((resp: any) => {
      this.user = resp;
      this.favorites = resp.FavoriteMovies;
      return this.user;
    });
  }

  updateUserProfile(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((res) => {
      console.log(res);
      this.snackBar.open(`${this.userData.Username} has been updated.`, 'OK', {
        duration: 1000
      });
    }, (res) => {
      console.log(res);
      this.snackBar.open(res, 'OK', {
        duration: 1000
      })
    })
  }

  deleteUserProfile(): void {
    this.fetchApiData.deleteUser(localStorage.getItem('user')).subscribe((res) => {
      localStorage.setItem('user', '');
      localStorage.setItem('token', '');
      this.snackBar.open(`${this.userData.Username} has been deleted.`, 'OK', {
        duration: 1000
      });
      this.router.navigate(['']);
    }, (res) => {
      console.log(res);
      this.snackBar.open(res, 'OK', {
        duration: 1000
      })
    })
  }
}
