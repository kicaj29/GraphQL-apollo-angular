import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooksQueryGQL } from './books.graphql-gen';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  titles$: Observable<string[]>;

  constructor(booksService: BooksQueryGQL) {
    this.titles$ = booksService.fetch({}).pipe(
      map(result => result.data.books.nodes.map(b => b.title))
    );
  }

  ngOnInit(): void {

  }

}
