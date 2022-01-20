import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-synopsis',
  templateUrl: './director-synopsis.component.html',
  styleUrls: ['./director-synopsis.component.scss']
})
export class DirectorSynopsisComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      bio: string,
      birth: string,
      death: string
    }
  ) { }

  ngOnInit(): void {
  }

}
