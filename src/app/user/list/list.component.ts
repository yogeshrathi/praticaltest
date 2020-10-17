import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public dataSource: any;
  key = 'employee_name';
  selectedEmp: any;
  reverse = false;
  p = 1;
  filterf: string;
  constructor(private userService: UserService, private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.getEmployees();
  }


  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  getEmployees(){
    this.userService.getEmployees().subscribe((res) => {
      this.dataSource = res.data;
     });
  }

  deleteEmployee(id){
    swal({
      title: 'Are you sure you want to delete this employee?',
      text: 'You cannot recover back this data.',
      icon: 'warning',
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        this.userService.deleteEmployee(id).subscribe((res) => {
          swal('Deleted!', 'Employee has been deleted!', 'success');
          this.getEmployees();
         });
      }
    });
  }

  viewEmployee(id){
    this.userService.getEmployee(id).subscribe((res) => {
      this.selectedEmp = res.data;
    });
  }

  editEmployee(id){
    this.router.navigate(['/user/edit'], {state: {emp_id: id}});
  }

  addEmployee(){
    this.router.navigate(['/user/add']);
  }

  logout(){
    this.loginService.logout();
  }
}
