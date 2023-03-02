import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employees:any =[]
  

  constructor(private employee:EmployeeService) { }

  ngOnInit(): void {


    
    this.employee.getEmployees().subscribe(res=>{
      // console.log(res);
      this.employees = res
    })

  }

  deleteEmployee(id:any){
    // console.log(id);
    this.employee.deleteEmployee(id).subscribe(res=>{
      // console.log(res);
      let status:any = res
      if(status.status == "success"){
        alert("deleted successfully")
        this.ngOnInit()
      }
    })
    
  }

}
