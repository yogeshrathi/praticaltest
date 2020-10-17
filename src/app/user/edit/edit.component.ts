import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: any;
  editEmpForm: FormGroup;

  constructor( private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.id = history.state.emp_id;
    if (!this.id){
      this.router.navigate(['/user/list']);
    }
    this.editEmpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      salary: ['', [Validators.required]],
      age: ['', [Validators.required]]
  });
   }

   get f() { return this.editEmpForm.controls; }


   ngOnInit(): void {
     this.getEmployeeData(this.id);
  }
  getEmployeeData(id) {
    this.userService.getEmployee(id).subscribe((res) => {
      this.patchData(res.data);
    });
  }

  private patchData(value) {
    this.editEmpForm.get('name').patchValue(value.employee_name);
    this.editEmpForm.get('salary').patchValue(value.employee_salary);
    this.editEmpForm.get('age').patchValue(value.employee_age);
  }


  onSubmit(){
    if (this.editEmpForm.invalid) {
        return;
    }
    else {
      this.userService.updateEmployee(this.editEmpForm.value, this.id).subscribe((res) => {
        swal('Added!', 'Employee has been updated!', 'success');
        this.router.navigate(['/user/list']);
       });
    }
  }

}
