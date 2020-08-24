import { Component, OnInit, OnDestroy, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCacheExampleService } from './book-cache-examples.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy   {

  titles$: Observable<string[]>;

  constructor(private cacheExamples: BookCacheExampleService
    ) {

    /*this.titles$ = this.booksService.fetch({}, {
    }).pipe(
      map(result => result.data.books.nodes.map(b => b.title))
    );*/

  }
  ngOnDestroy(): void {
    this.cacheExamples.unsubscribeAll();
  }

  ngOnInit(): void {

  }

  resetCache() {
    this.cacheExamples.resetCache();
  }

  unsubscribeAll() {
    this.cacheExamples.unsubscribeAll();
  }

  useCacheAndNetwork1() {
    this.cacheExamples.useCacheAndNetwork1();
  }

  useCacheAndNetwork2() {
    this.cacheExamples.useCacheAndNetwork2();
  }

  useCacheAndNetwork3() {
    this.cacheExamples.useCacheAndNetwork3();
  }

  useCacheFirst() {
    this.cacheExamples.useCacheFirst();
  }

  useFetch(){
    this.cacheExamples.useFetch();
  }

}
