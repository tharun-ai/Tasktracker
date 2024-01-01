import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { Task } from './task-list/Task';
import { TaskServiceService } from './task-service.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog,private taskService:TaskServiceService) {}

  public openConfirmationDialog(action:string,task: Task){



      const dialogRef = this.dialog.open(AlertDialogComponent, {
        height:'150px',
        width: '300px', // Adjust the width as needed
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        // Handle the result after the dialog is closed
        if (result) {
          // Perform actions based on the result, e.g., save or update task
          console.log(result);
          this.taskService.deleteTask(task);
          
          
        }
        else{
          dialogRef.close();
        }
      });
  
     
    
  }
}
