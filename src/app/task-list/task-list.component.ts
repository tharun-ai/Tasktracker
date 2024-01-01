import { Component, OnInit } from '@angular/core';
import { Task } from './Task';
import { TaskServiceService } from '../task-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Observable} from 'rxjs';
import { DialogService } from '../dialog.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public taskList!: Task[];
  public taskList$!:Observable<Task[]>;

  constructor(public taskService:TaskServiceService,private dialog: MatDialog){

  }
  ngOnInit(): void {
   
    this.taskList$=this.taskService.getTasks();
  }

  

  public deleteTask(deleteTask:Task){

    const dialogRef = this.dialog.open(AlertDialogComponent, {
    
      data: '',
      height:'150px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed
      if (result) {
        // Perform actions based on the result, e.g., save or update task
        console.log(result);
        this.taskService.deleteTask(deleteTask)
      }
    });
   
  }

  public editTask(editTask:Task){
  

    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '40vw',
      data: editTask
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed
      if (result) {
        // Perform actions based on the result, e.g., save or update task
        if(result.id){
          this.taskService.editTask(result);
        }
        else{
          
        }
      }
    });
  }

  openTaskModal(taskData: any) {
   
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '40vw',
      data: taskData
    });

    dialogRef.afterClosed().subscribe(async result => {
      // Handle the result after the dialog is closed
      if (result) {
        // Perform actions based on the result, e.g., save or update task
       this.taskService.addTask(result);
            
      }

    });
  }
  
}
