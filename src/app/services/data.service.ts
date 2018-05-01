import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiResponse} from '../models/post.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {People, AppState} from '../models/post.model'
import {Store} from '@ngrx/store'
import * as moment from 'moment/moment';
import * as PostActions from '../actions/post.actions';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
// ToDo: load API_URL from from constants.
//import { Configuration } from '../app.constants';

@Injectable()
export class DataService {
  private  API_URL = 'https://randomapi.com/api/erb3dowx?key=GOV2-3ZOI-M3WQ-2J9Y';// Use any api for testing: 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<ApiResponse[]> = new BehaviorSubject<ApiResponse[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  people: People[];
  issue: ApiResponse[];

  constructor (
    private httpClient: HttpClient, 
    private store: Store<AppState>,
    private _toasterService: ToasterService,
    private _slimLoadingBarService: SlimLoadingBarService
    //, private _configuration: Configuration
  ) {
    //this.API_URL = _configuration.ServerWithApiUrl;
  }

  get data(): ApiResponse[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
        // ToDo: slim loading bar stopped working, was fine in previous (similar) project.
        //this._slimLoadingBarService.start();
        this.httpClient.get<People[]>(this.API_URL).subscribe(data => {
          
          this.people = data;
          this.issue = this.people['results'];
          let jsonString = '{"results":[{"name":"James Parker","country":"Holy See (Vatican City State)","date":"2017-10-21T17:59:19.961Z","picture":"https://s3.amazonaws.com/uifaces/faces/twitter/abdots/128.jpg","phone":"607-735-9372 x46771","gender":"Mr.","title":"Global Response Director"}],"info":{"seed":"2ee6f2a238b31577","results":"1","page":"1","version":"0.1","time":{"instruct":22,"generate":39},"user":{"username":"Mick","tier":"Free [1]","results":"1 / 500","remaining":"499"}}}';
          this.people = JSON.parse(jsonString);
          let p = this.people['results'][0];
          this.issue.push(p);
          let counter = 0;
          this.issue.forEach(function (value) {
            counter++;
            value.id = counter;
            let birthDate = new Date(value.date);
            value.date = moment(birthDate, "YYYYMMDD").fromNow();
          }); 
          try{
            this.store.dispatch(new PostActions.FetchNew(this.issue));
          } catch(e){
              console.log(e);
          }
          this.dataChange.next(this.issue);
          // ToDo: get css to load correclty for toaster.
          //this._toasterService.pop('success', 'Success', 'Getting all values complete');
          //this._slimLoadingBarService.stop();
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        //this._slimLoadingBarService.stop();
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (issue: ApiResponse): void {
    this.dialogData = issue;
  }

  updateIssue (issue: ApiResponse): void {
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }
}



/* REAL LIFE CRUD Methods that can be used in this projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




