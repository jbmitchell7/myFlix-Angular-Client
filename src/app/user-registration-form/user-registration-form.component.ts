import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.fetchApiData.userRegister(this.userData).subscribe((result) => {
      console.log(result);
      this.dialogRef.close();
      this.snackBar.open(`${this.userData.Username} has been registered. Please login now.`, 'OK', {
        duration: 4000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 1000
      });
    });
  }

}
