import * as PostActions from '../actions/post.actions';
import {Results} from '../models/post.model'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SharedComponent} from '../shared/services/shared';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const newState = (state, newData) => {
    return Object.assign({}, state, newData)
}
 
export type Action = PostActions.All;

let _sharedComponent: SharedComponent;

export function postReducer(state: Array<Results>, action: Action){
    switch(action.type)
    {
        case PostActions.FETCH_NEW:
            return newState(state, {text: action.payload});

        default:
            return state;
    }
}