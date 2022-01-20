import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-synopsis',
  templateUrl: './genre-synopsis.component.html',
  styleUrls: ['./genre-synopsis.component.scss']
})
export class GenreSynopsisComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      description: string
    }
  ) { }

  ngOnInit(): void {
  }

}
