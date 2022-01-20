import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router
  ) { }

  backToMovies(): void {
    this.router.navigate(['movies']);
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  dateConvert = (dateInput: any) => {
    let year = dateInput.substr(0, 4);
    let month = dateInput.substr(5, 2);
    let day = dateInput.substr(8, 2);
    let date = `${month}-${day}-${year}`;
    return date
  }

  getUserProfile(): void {
    this.fetchApiData.getUser(localStorage.getItem('user')).subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    });
  }

}
