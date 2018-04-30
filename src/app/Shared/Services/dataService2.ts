import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Results} from '../../models/post.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService2 {
  //private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<Results[]> = new BehaviorSubject<Results[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Results[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    // this.httpClient.get<Results[]>(this.API_URL).subscribe(data => {
    //     this.dataChange.next(data);
    //   },
    //   (error: HttpErrorResponse) => {
    //   console.log (error.name + ' ' + error.message);
    //   });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (issue: Results): void {
    this.dialogData = issue;
  }

  updateIssue (issue: Results): void {
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }
}