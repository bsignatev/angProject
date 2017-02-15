import { Injectable } from '@angular/core';
import { Store, Action, combineReducers } from '@ngrx/store';

@Injectable()
export class AppActions {
    static COURSES_LOADED = "COURSES_LOADED";
    static ADD_COURSE = "ADD_COURSE";
    static UPDATE_COURSE = "UPDATE_COURSE";
    static DELETE_COURSE = "DELETE_COURSE";

    static AUTHORS_LOADED = "AUTHORS_LOADED";
    static COURSE_LOADED = "COURSE_LOADED";

    constructor(private _store: Store<any>) {
    }

    dispatch(type: string, payload?: any) {
        this._store.dispatch({
            type,
            payload
        });
    }

    getState(): any {
        let state;
        this._store.take(1).subscribe(s => state = s);
        return state;
    }
}