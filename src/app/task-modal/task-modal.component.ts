import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
 
  public  createTask: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.createTask = fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      description: [data.description],
      dueDate: [data.dueDate, Validators.required]
    });
  
  }

  public onSubmit(taskAdded:FormGroup){
    this.dialogRef.close(this.createTask.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
