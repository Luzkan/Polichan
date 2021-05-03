import {Subscription} from 'rxjs';
import {Directive, OnDestroy} from '@angular/core';
import {Dictionary} from '../dictionary/dictionary.model';
import {v4 as uuid} from 'uuid';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractCleanable implements OnDestroy {
  private subscriptions: Dictionary<Subscription> = {};

  protected addSubscription(subscription: Subscription, name?: string): void {
    const subscriptionName = name ?? uuid();
    this.clean(subscriptionName);
    this.subscriptions[subscriptionName] = subscription;
  }

  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach((name) => this.clean(name));
  }

  private clean(name: string): void {
    const subscription = this.subscriptions[name];
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  }
}
