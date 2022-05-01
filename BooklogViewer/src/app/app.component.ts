import {Component, OnInit} from '@angular/core';
import { tap } from 'rxjs';
import {AllRepository} from "./repository/all.repository";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private repository: AllRepository) {
  }

  ngOnInit() {
    this.repository.getAllData().pipe(
      tap(resp => resp.books.map(book => console.log(book.title)))
    ).subscribe();
  }
}
