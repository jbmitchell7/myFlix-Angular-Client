import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: '' };

  constructor(
    public apiLogin: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.apiLogin.loginUser(this.userCredentials).subscribe((result) => {
      this.dialogRef.close();
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      this.router.navigate(['movies']);
      this.snackBar.open(`${result.user.Username} has logged in.`, 'OK', {
        duration: 1000
      });
    }, (result) => {
      this.snackBar.open('Login failed.', 'OK', {
        duration: 1000
      });
    });
  }
}
