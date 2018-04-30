import * as PostActions from '../../actions/post.actions';
import {Results, People, AppState} from '../../models/post.model'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store'
import * as moment from 'moment/moment';

export type Action = PostActions.All;

// ToDo: If object gets more complex use the following:.
// const newState = (state, newData) => {
//     return Object.assign({}, state, newData)
// }

@Injectable()
export class SharedComponent {
    results: Array<any>;
    people: People[];
    constructor(
        // public _dataService: DataService, 
        public http: Http,
        private store: Store<AppState>
    ){
        //this.post = this.store.select('result')
    }
    getNamesList() {
        // let jsonString = '{"results":[{"name":"Maximillia Flatley","country":"Holy See (Vatican City State)","date":"2017-10-21T17:59:19.961Z","picture":"https://s3.amazonaws.com/uifaces/faces/twitter/abdots/128.jpg","phone":"607-735-9372 x46771","gender":"Mr.","title":"Global Response Director"}],"info":{"seed":"2ee6f2a238b31577","results":"1","page":"1","version":"0.1","time":{"instruct":22,"generate":39},"user":{"username":"Mick","tier":"Free [1]","results":"1 / 500","remaining":"499"}}}';
        // this.people = JSON.parse(jsonString);

        console.log(this.results);
        return this.http.get('https://randomapi.com/api/erb3dowx?key=GOV2-3ZOI-M3WQ-2J9Y')//'https://jsonplaceholder.typicode.com/posts/1') //
        .map((res: Response) => <Response>res.json())
        .toPromise()
        .then( res => {
            this.people = res;
            this.results = this.people['results'];
            let jsonString = jsonString = '{"results":[{"name":"James Parker","country":"Holy See (Vatican City State)","date":"2017-10-21T17:59:19.961Z","picture":"https://s3.amazonaws.com/uifaces/faces/twitter/abdots/128.jpg","phone":"607-735-9372 x46771","gender":"Mr.","title":"Global Response Director"}],"info":{"seed":"2ee6f2a238b31577","results":"1","page":"1","version":"0.1","time":{"instruct":22,"generate":39},"user":{"username":"Mick","tier":"Free [1]","results":"1 / 500","remaining":"499"}}}';
            this.people = JSON.parse(jsonString);
            var p = this.people['results'][0];
            this.results.push(p);
            this.results.forEach(function (value) {
                let birthDate = new Date(value.date);
                value.date = moment(birthDate, "YYYYMMDD").fromNow();
              }); 
            this.store.dispatch(new PostActions.FetchNew(this.results));
            return this.results;
        }).catch(err => {
            console.log(err)
            return err;
        })
    }
}