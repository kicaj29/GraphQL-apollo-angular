import { Component, OnInit, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCacheExampleService } from './book-cache-examples.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  titles$: Observable<string[]>;

  constructor(private cacheExamples: BookCacheExampleService
    ) {

    /*this.titles$ = this.booksService.fetch({}, {
    }).pipe(
      map(result => result.data.books.nodes.map(b => b.title))
    );*/

  }

  ngOnInit(): void {

  }

  resetCache() {
    this.resetCache();
  }

  useCacheFirst() {
    this.cacheExamples.useCacheFirst();
  }

}
