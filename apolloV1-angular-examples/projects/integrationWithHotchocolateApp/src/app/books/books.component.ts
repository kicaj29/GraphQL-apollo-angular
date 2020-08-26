import { Component, OnInit, OnDestroy, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCacheExampleService } from './book-cache-examples.service';
import { BookSubscriptionsExampleService } from './books-subscription-examples.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy   {

  titles$: Observable<string[]>;

  constructor(private cacheExamples: BookCacheExampleService,
              private subscriptionsExamples: BookSubscriptionsExampleService
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
    this.subscriptionsExamples.unsubscribeRxJsAll();
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

  useNetworkOnly1(){
    this.cacheExamples.useNetworkOnly1();
  }

  useNetworkOnly2(){
    this.cacheExamples.useNetworkOnly2();
  }

  useCacheFirst() {
    this.cacheExamples.useCacheFirst();
  }

  useFetch(){
    this.cacheExamples.useFetch();
  }

  useNoCache1() {
    this.cacheExamples.useNoCache1();
  }

  useNoCache2() {
    this.cacheExamples.useNoCache2();
  }

  useCacheOnly1() {
    this.cacheExamples.useCacheOnly1();
  }

  useCacheOnly2() {
    this.cacheExamples.useCacheOnly2();
  }


  subscribeOnReview() {
    this.subscriptionsExamples.subscribe();
  }
}
