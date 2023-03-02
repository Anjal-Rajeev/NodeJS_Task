import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:3000";

  getEmployees(){
    return this.http.get(`${this.api}/employees`)
  }

  deleteEmployee(id:any){
    return this.http.delete(`${this.api}/delete-employee/${id}`)
  }

}
