import { Store, combineReducers } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { OnInit, OnDestroy } from '@angular/core';

export abstract class PageComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    constructor(private _store: Store<any>, private _reducers: any) {
    }

    ngOnInit() {
        this._store.replaceReducer(combineReducers(this._reducers));
        this.onInit();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(x => x.unsubscribe());
        this.subscriptions = null;
    }

    protected _subscription(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    protected _subscriptions(subscriptions: Subscription[]) {
        this.subscriptions.push(...subscriptions);
    }

    abstract onInit();
}