import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { Task } from '../task-list/Task';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  public chartOptions: any;

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.generateChart();
  }

  public generateChart(): void {
    // Fetch tasks due in the next 7 days from the service
    const tasksDueIn7Days = this.taskService.getTasksDueInNext7Days();
  
    // Prepare data for the chart
    const chartData = this.prepareChartData(tasksDueIn7Days);
  
    // Set up ApexCharts options
    this.chartOptions = {
      series: chartData.series,
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          stacked: true, // Enable stacking
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: chartData.categories,
      },
      yaxis: {
        title: {
          text: 'Number of Tasks',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val} tasks`,
        },
        custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
          const taskNames = chartData.taskNames[dataPointIndex];
          return `<div>${taskNames.join('<br>')}</div>`;
        },
      },
    };
  }
  
  public prepareChartData(tasks: Task[]): { series: { name: string, data: number[] }[], categories: string[], taskNames: string[][] } {
    const taskCountByDay: { [key: string]: number } = {};
    const taskNamesByDay: { [key: string]: string[] } = {};
  
    tasks.forEach((task) => {
      const dueDate = new Date(task.dueDate);
      const dayKey = dueDate.toISOString().split('T')[0];
  
      if (taskCountByDay[dayKey]) {
        taskCountByDay[dayKey]++;
        taskNamesByDay[dayKey].push(task.name);
      } else {
        taskCountByDay[dayKey] = 1;
        taskNamesByDay[dayKey] = [task.name];
      }
    });
  
    const allDueDates = Array.from(new Set([...Object.keys(taskCountByDay), ...tasks.map(task => new Date(task.dueDate).toISOString().split('T')[0])]));
  
    const categories = allDueDates.sort(); // Ensure categories are sorted
    const series = [{
      name: 'Tasks Due',
      data: categories.map(day => taskCountByDay[day] || 0), // Ensure we have a value (default to 0 if not found)
    }];
    const taskNames = categories.map((day) => taskNamesByDay[day] || []);
  
    return { series, categories, taskNames };
  }
  
  
}
