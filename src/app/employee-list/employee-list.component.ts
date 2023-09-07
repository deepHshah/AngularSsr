import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees!: any[];

  constructor(private dataService: DataService, private meta: Meta) { }

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe(data => {
      this.employees = data;
      console.log(this.employees[0]);
      // this.employees.forEach(employee => {
      //   console.log(employee.imageUrl)
      // });

      this.meta.addTags([
        { name: 'twitter:card', content: 'summary' },
        { name: 'og:url', content: '/about' },
        { name: 'og:title', content: `${this.employees[0].firstName} ${this.employees[0].lastName}`},
        { name: 'og:description', content: `These are the this.employees of Shah Group Of Industries`  },
        { name: 'og:image', content:  this.employees[0].imageUrl },
      ]);
      
    });
  } 
}


