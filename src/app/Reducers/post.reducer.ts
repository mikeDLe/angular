import * as PostActions from '../actions/post.actions';
import {ApiResponse} from '../models/post.model'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DataService} from '../services/data.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const newState = (state, newData) => {
    return Object.assign({}, state, newData)
}
 
export type Action = PostActions.All;

let _sharedComponent: DataService;

export function postReducer(state: Array<ApiResponse>, action: Action){
    switch(action.type)
    {
        case PostActions.FETCH_NEW:
            return newState(state, {text: action.payload});
        default:
            return state;
    }
}