import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule,
} from '@angular/material';
import {DataService} from './services/data.service';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {postReducer} from './reducers/post.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { ToasterService, ToasterModule } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { HttpModule } from '@angular/http';
import { Configuration } from './app.constants';
//import { SharedComponent} from './shared/services/shared';

@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,

    NoopAnimationsModule,
    StoreModule.forRoot({
      post: postReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge:10
    }),
    HttpModule,
    ToasterModule,
    SlimLoadingBarModule.forRoot(),
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    DataService,
    ToasterService,
    SlimLoadingBarService,
    Configuration,
    //SharedComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
