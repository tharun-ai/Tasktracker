import { Injectable } from '@angular/core';
import { Task } from './task-list/Task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {


  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  public taskList:Task[]=[
    {id:1,name:"Task 1",description:"I need to complete the task 1",dueDate:new Date("1/4/2024")},
    {id:2,name:"Task 2",description:"I need to complete the task 2",dueDate:new Date("1/5/2024")},
    {id:3,name:"Task 3",description:"I need to complete the task 3",dueDate:new Date("1/6/2024")},
    {id:4,name:"Task 4",description:"I need to complete the task 4",dueDate:new Date("1/4/2024")},
    {id:5,name:"Task 5",description:"I need to complete the task 5",dueDate:new Date("1/8/2024")},
    {id:6,name:"Task 6",description:"I need to complete the task 6",dueDate:new Date("1/9/2024")},
    {id:7,name:"Task 7",description:"I need to complete the task 7",dueDate:new Date("1/10/2024")},
    {id:8,name:"Task 8",description:"I need to complete the task 8",dueDate:new Date("1/11/2024")},
    {id:9,name:"Task 9",description:"I need to complete the task 9",dueDate:new Date("1/12/2024")},
    {id:10,name:"Task 10",description:"I need to complete the task 10",dueDate:new Date("1/13/2024")},
    {id:11,name:"Task 11",description:"I need to complete the task 11",dueDate:new Date("1/14/2024")},
    {id:12,name:"Task 12",description:"I need to complete the task 12",dueDate:new Date("1/15/2024")},
    {id:13,name:"Task 13",description:"I need to complete the task 13",dueDate:new Date("1/16/2024")},
    {id:14,name:"Task 14",description:"I need to complete the task 14",dueDate:new Date("1/17/2024")},
    {id:15,name:"Task 15",description:"I need to complete the task ",dueDate:new Date("1/18/2024")},
    
  ]
  constructor() { }


  public getTasks():Observable<Task[]>{
    // Update the BehaviorSubject with the fetched tasks
    this.tasksSubject.next(this.taskList);
   return this.tasks$
  }

  public addTask(addTask:Task){
    setTimeout(() => {
      const latestTask = this.taskList.reduce((cur, next) => (next.id > cur.id ? next : cur), { id: 0 });

      // Merge the latest task with the new task
      const mergedTaskList = [...this.taskList, { ...addTask, id: latestTask.id + 1 }];
      this.taskList=mergedTaskList;
      // Update the BehaviorSubject with the merged task list
      this.tasksSubject.next(mergedTaskList);
    }, 0);
   
  }
  public editTask(editTask:Task){
    const updatedTaskList = this.taskList.map((task) => (task.id === editTask.id ? editTask : task));

    // Update the reference of the taskList
    this.taskList = updatedTaskList;

    // Update the BehaviorSubject with the updated task list
    this.tasksSubject.next(updatedTaskList);
  }

  public deleteTask(deleteTask:Task){
    const updatedTaskList = this.taskList.filter((task) => task.id !== deleteTask.id);

    // Update the reference of the taskList
    this.taskList = updatedTaskList;
  
    // Update the BehaviorSubject with the updated task list
    this.tasksSubject.next(updatedTaskList);
  }


  public getTasksDueInNext7Days(): Task[] {
    const today = new Date();
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);
    const dueTasks = this.taskList.filter(task => task.dueDate >= today && task.dueDate <= next7Days);

    return dueTasks;
  }
  
  
}
