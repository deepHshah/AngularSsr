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

      // this.meta.addTags([
      //   { name: 'twitter:card', content: 'summary' },
      //   { name: 'og:url', content: '/about' },
      //   { name: 'og:title', content: `${this.employees[0].firstName} ${this.employees[0].lastName}`},
      //   { name: 'og:description', content: `These are the this.employees of Shah Group Of Industries`  },
      //   { name: 'og:image', content:  this.employees[0].imageUrl },
      // ]);

      this.meta.addTags([
        { name: 'title', content: `${this.employees[0].firstName} ${this.employees[0].lastName}` },
        { name: 'description', content: this.employees[0].email },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://angular-ssr-testing.netlify.app/' },
        { property: 'og:title', content: `${this.employees[0].firstName} ${this.employees[0].lastName}` },
        { property: 'og:description', content: this.employees[0].email },
        { property: 'og:image', content: this.employees[0].imageUrl },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://angular-ssr-testing.netlify.app/' },
        { property: 'twitter:title', content:`${this.employees[0].firstName} ${this.employees[0].lastName}` },
        { property: 'twitter:description', content: this.employees[0].email },
        { property: 'twitter:image', content: this.employees[0].imageUrl },
      ]);
    })
  }
}
    
    
    
    
    
    


