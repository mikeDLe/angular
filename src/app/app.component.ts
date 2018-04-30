import { Component , OnInit, ViewChild, ElementRef} from '@angular/core';
import {Store} from '@ngrx/store'
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx'
import {postReducer} from './reducers/post.reducer';
import {Results, AppState, Address, User} from './models/post.model'
import * as PostActions from './actions/post.actions';
import 'rxjs/add/operator/map';
import {SharedComponent} from './shared/services/shared';
// ToDo: remove from packages: import {JsonObject, JsonProperty, JsonConvert} from "json2typescript";
import {deserialize} from 'json-typescript-mapper';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatTableModule,
  MatPaginator, MatSort
} from '@angular/material';

  import 'rxjs/add/observable/of';
  import {DataSource} from '@angular/cdk/collections';
  import {BehaviorSubject} from 'rxjs/BehaviorSubject';
  import {DataService2} from './shared/services/dataService2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  address = new Address();
  post: Observable<Array<Results>>
  search: string
  public message: string
  returnData: Observable<Results[]>
  //public values: any[];
  result: any;

  title = 'app';
  displayedColumns = ['gender', 'title', 'name', 'date', 'picture', 'phone', 'country']; 
  dataSource = this.result;
  constructor(private store: Store<AppState>,
      private _sharedComponent: SharedComponent,
      public _toasterService: ToasterService,
      public _slimLoadingBarService: SlimLoadingBarService,
  ){
    this.post = this.store.select('result')
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  
   ngOnInit(): void {
     this.fetchNew();
   }

   onSubmit() {
    alert("Thanks for submitting! Data: " + JSON.stringify(this.address));
  }

  searchName(){
    this.result = this.searchObjects(this.returnData ,'name',this.search);
    this.returnData = JSON.parse(JSON.stringify(this.result));
  }

   fetchNew(){
      this._slimLoadingBarService.start();
      this._sharedComponent.getNamesList().then(res => {
        // ToDo: the following line causes "ERROR in src/app/app.component.ts(145,1): error TS1128: Declaration or statement expected."
        //       seemed to have failed after running "ng set defaults.styleExt scss"
        this.returnData = res;
        this.result= res;
        //this.dataSource = this.result;
        this.dataSource = new ResultsDataSource(this.result, this.paginator, this.sort);
        //this.refreshTable();
        //this.paginator._changePageSize(this.paginator.pageSize); 
        this._toasterService.pop('success', 'Success', 'Getting all values complete');
        this._slimLoadingBarService.stop();
        }
      )
    }

    // private refreshTable() {
    //   // if there's a paginator active we're using it for refresh
    //   if (this.dataSource._paginator.hasNextPage()) {
    //     this.dataSource._paginator.nextPage();
    //     this.dataSource._paginator.previousPage();
    //     // in case we're on last page this if will tick
    //   } else if (this.dataSource._paginator.hasPreviousPage()) {
    //     this.dataSource._paginator.previousPage();
    //     this.dataSource._paginator.nextPage();
    //     // in all other cases including active filter we do it like this
    //   } else {
    //     this.dataSource.filter = '';
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   }
    // }

    searchObjects(obj, key, val) {
      var objects = [];
      val = val.toLowerCase();
      for (var i in obj) {
          if (!obj.hasOwnProperty(i)) continue;
          if (typeof obj[i] == 'object') {
              objects = objects.concat(this.searchObjects(obj[i], key, val));    
          } else 
          if (i == key && obj[i].toLowerCase().indexOf(val) > -1|| i == key && val == '') { //
              objects.push(obj);
          } else if (obj[i].toLowerCase().indexOf(val) > -1 && key == ''){
              //only add if the object is not already in the array
              if (objects.lastIndexOf(obj) == -1){
                  objects.push(obj);
              }
          }
      }
      return objects;
    }
  }
}


export class ResultsDataSource extends DataSource<Results> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Results[] = [];
  renderedData: Results[] = [];

  constructor(public _dataService2: DataService2,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    //this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Results[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._dataService2.dataChange,
      this._sort.sortChange,
      this._filterChange,
      //this._paginator.page
    ];

    //this._dataService2.getAllIssues();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      // this.filteredData = this._exampleDatabase.data.slice().filter((issue: Results) => {
      //   const searchStr = (issue.id + issue.title + issue.url + issue.created_at).toLowerCase();
      //   return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      // });

      // Sort filtered data
      //const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      //const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      //this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }




