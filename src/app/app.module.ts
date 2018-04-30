import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {postReducer} from './reducers/post.reducer';
import {FormsModule} from '@angular/forms';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import { HttpClientModule } from '@angular/common/http';

import { ToasterService, ToasterModule } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DataService } from './shared/services/dataService';
import { HttpModule } from '@angular/http';
import { Configuration } from './app.constants';
import { SharedComponent} from './shared/services/shared';
import { MatButtonModule, MatInputModule,MatFormField,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatPaginatorModule, 
  MatProgressSpinnerModule, 
  MatSortModule, 
  MatTableModule} from '@angular/material';
  //import { UserService } from './my-form/test';
 //import { UsertableComponent } from './components/usertable/usertable.component';

@NgModule({
  declarations: [
    AppComponent,
    //UsertableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule, 
    MatInputModule,
    StoreModule.forRoot({
      post: postReducer,
    }),
    FormsModule,
    StoreDevtoolsModule.instrument({
      maxAge:10
    }),
    HttpClientModule,
    HttpModule,
    ToasterModule,
    SlimLoadingBarModule.forRoot(),
    [ MatButtonModule, MatInputModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      MatPaginatorModule, 
      MatProgressSpinnerModule, 
      MatSortModule, 
      MatTableModule]
  ],
  providers: [

    ToasterService,
    SlimLoadingBarService,
    DataService,
    Configuration,
    SharedComponent,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
