import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addEmpForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.addEmpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      salary: ['', [Validators.required]],
      age: ['', [Validators.required]]
  });
  }
  get f() { return this.addEmpForm.controls; }


  onSubmit(){
    if (this.addEmpForm.invalid) {
        return;
    }
    else{
      this.userService.createEmployee(this.addEmpForm.value).subscribe((res) => {
        swal('Added!', 'Employee has been added!', 'success');
        this.router.navigate(['/user/list']);
       });
    }
  }


}
