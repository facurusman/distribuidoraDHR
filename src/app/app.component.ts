import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  title = 'Distribuidora DHR';
  constructor(
  ) {}

  ngOnInit(): void {
  }
}

