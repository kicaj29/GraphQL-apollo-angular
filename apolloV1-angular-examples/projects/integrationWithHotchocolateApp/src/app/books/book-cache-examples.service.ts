import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { BooksQueryGQL, BooksQueryAllSimpleFieldsGQL } from './books.graphql-gen';
import { ApolloClientOptions } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import { ValuesOfCorrectTypeRule } from 'graphql';

@Injectable({
  providedIn: 'root',
})
export class BookCacheExampleService {

  constructor(
    private booksService: BooksQueryGQL,
    private booksServiceAllSimpleFields: BooksQueryAllSimpleFieldsGQL,
    private apollo: Apollo
  ) { }

  resetCache() {
    // this.apollo.getClient().cache.reset().then(() => console.log('reset done'));
    // this.apollo.getClient().clearStore().then(() => console.log('clearStore done'));
    this.apollo.getClient().resetStore().then(() => console.log('reset store done'));
 }

 useCacheFirst() {

  this.booksService.fetch({}, {
    fetchPolicy: 'cache-first'
  }).pipe(
    concatMap(val => {
      console.log('---FIRST FETCH from server---');
      const sa = val.data.books.nodes.map(n => `id: ${n.id}, title: ${n.title}`);
      sa.forEach(s => console.log(s));

      return this.booksServiceAllSimpleFields.fetch({}, {
        fetchPolicy: 'cache-first'
      }).pipe(
        concatMap(val1 => {
          console.log('---SECOND FETCH from server---');
          // it has to be fetched from the server because data in the cache does not contain all needed fields from this type
          const sa1 = val1.data.books.nodes.map(n => `id: ${n.id}, title: ${n.title}, price: ${n.price}, authorId: ${n.authorId}`);
          sa1.forEach(s => console.log(s));

          return this.booksServiceAllSimpleFields.fetch({}, {
            fetchPolicy: 'cache-first'
          });
        }));
    })
  ).subscribe(val => {
    console.log('---THIRD FETCH from apollo cache---');
    // this time it can be fetched from the cache because SECOND FETCH updated the cache with all needed data
    const sa = val.data.books.nodes.map(n => `id: ${n.id}, title: ${n.title}, price: ${n.price}, authorId: ${n.authorId}`);
    sa.forEach(s => console.log(s));
  });
}

}
