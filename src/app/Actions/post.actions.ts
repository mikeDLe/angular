import {Action} from '@ngrx/store';
import {ApiResponse} from '../models/post.model'

// Set up ready for more actions in the future.

export const FETCH_NEW = '[Post] FetchNew';

export class FetchNew implements Action{
    readonly type = FETCH_NEW;
    constructor(public payload: Array<ApiResponse>){
    }
}

export type All 
    = FetchNew;