import {Subscription} from 'rxjs';
import {Directive, OnDestroy} from '@angular/core';
import {Dictionary} from '../types/dictionary.model';
import {v4 as uuid} from 'uuid';
import {Optional} from '../types/optional.model';
import {isNil} from 'lodash-es';

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

  protected safeGetter<T>(value: Optional<T>, name: string): T {
    if (isNil(value)) {
      throw new Error(`Value for ${name} is not defined`);
    }
    return value;
  }
}
