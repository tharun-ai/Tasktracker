import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {path:'tasklist',component:TaskListComponent},
  {path:'showchart',component:ChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
