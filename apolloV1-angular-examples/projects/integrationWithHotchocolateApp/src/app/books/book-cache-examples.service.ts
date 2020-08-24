import { Injectable  } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { BooksQueryGQL, BooksQueryAllSimpleFieldsGQL } from './books.graphql-gen';
import { NetworkStatus, ApolloQueryResult } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import { ValuesOfCorrectTypeRule } from 'graphql';

@Injectable({
  providedIn: 'root',
})
export class BookCacheExampleService {

  private subscriptions: Subscription[] = [];
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

 unsubscribeAll() {
   this.subscriptions.forEach(s => s.unsubscribe());
 }

 useCacheAndNetwork1() {
  const sub = this.booksService.watch({}, {
    fetchPolicy: 'cache-and-network'
  }).valueChanges.subscribe(val => {
    console.log(`---FIRST WATCH: ${val.networkStatus}---`);
    if (val.networkStatus === NetworkStatus.ready) {
      const sa = val.data.books.nodes.map(n => `id: ${n.id}, title: ${n.title}`);
      sa.forEach(s => console.log(s));
    }
  });
  this.subscriptions.push(sub);
 }

 useCacheAndNetwork2() {
  const sub = this.booksServiceAllSimpleFields.watch({}, {
    fetchPolicy: 'cache-and-network'
  }).valueChanges.subscribe(val => {
    console.log(`---SECOND WATCH: ${val.networkStatus}---`);
    if (val.networkStatus === NetworkStatus.ready) {
      const sa = val.data.books.nodes.map(n => `id: ${n.id}, title: ${n.title}, price: ${n.price}, authorId: ${n.authorId}, timeStamp: ${n.timeStamp}`);
      sa.forEach(s => console.log(s));
    }
  });
  this.subscriptions.push(sub);
 }

 useCacheAndNetwork3() {
  const sub = this.booksServiceAllSimpleFields.watch({}, {
    fetchPolicy: 'cache-and-network'
  }).valueChanges.subscribe(val => {
    console.log(`---THIRD WATCH: ${val.networkStatus}---`);
    if (val.networkStatus === NetworkStatus.ready) {
      const sa = val.data.books.nodes.map(n => `id: ${n.id}, title: ${n.title}, price: ${n.price}, authorId: ${n.authorId}, timeStamp: ${n.timeStamp}`);
      sa.forEach(s => console.log(s));
    }
  });
  this.subscriptions.push(sub);
 }

 useFetch() {
  const sub = this.booksServiceAllSimpleFields.fetch({}, {
    fetchPolicy: 'cache-first'
  }).subscribe(val => {
    console.log(`---USE FETCH: ${val.networkStatus}---`);
    if (val.networkStatus === NetworkStatus.ready) {
      const sa = val.data.books.nodes.map(n => `id: ${n.id}, title: ${n.title}, price: ${n.price}, authorId: ${n.authorId}, timeStamp: ${n.timeStamp}`);
      sa.forEach(s => console.log(s));
    }
  });
  this.subscriptions.push(sub);
 }

 useCacheFirst() {
    const sub = this.booksService.fetch({}, {
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
    this.subscriptions.push(sub);
  }

}
