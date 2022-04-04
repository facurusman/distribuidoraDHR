import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  @Input() childMessage : string = ""
  constructor() { }

  ngOnInit(): void {
  }
}
