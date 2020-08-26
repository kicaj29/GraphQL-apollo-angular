import { Injectable  } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { BooksQueryGQL, BooksQueryAllSimpleFieldsGQL, OnReviewSubscriptionGQL, OnReviewWithBookIdSubscriptionGQL } from './books.graphql-gen';
import { NetworkStatus, ApolloQueryResult } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import { ValuesOfCorrectTypeRule } from 'graphql';

@Injectable({
  providedIn: 'root',
})
export class BookSubscriptionsExampleService {

  private subscriptionsRxJs: Subscription[] = [];

  constructor(
    private onReviewSubscription: OnReviewSubscriptionGQL,
    private onReviewWithBookIdSubscription: OnReviewWithBookIdSubscriptionGQL
  ) {

  }

  subscribe(){

    const sub = this.onReviewSubscription.subscribe().subscribe(val => {
      console.log(`SUBSCRIPTION: stars:${val.data.onReview.stars}, commentary: ${val.data.onReview.commentary}, bookId: ${val.data.onReview.bookId}`);
    });

    const sub1 = this.onReviewWithBookIdSubscription.subscribe().subscribe(val => {
      console.log(`SUBSCRIPTION with bookID = 5: stars:${val.data.onReviewWithBookId.stars}, commentary: ${val.data.onReviewWithBookId.commentary}, bookId: ${val.data.onReviewWithBookId.bookId}`);
    });

    this.subscriptionsRxJs.push(sub);
    this.subscriptionsRxJs.push(sub1);
  }

  unsubscribeRxJsAll() {
    this.subscriptionsRxJs.forEach(s => s.unsubscribe());
  }
}
