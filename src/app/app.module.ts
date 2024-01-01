import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskServiceService } from './task-service.service';
import { ChartComponent } from './chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {  MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule}  from  '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskModalComponent,
    ChartComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgApexchartsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [TaskServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
