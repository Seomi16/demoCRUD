import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  UserForm: FormGroup;
  radioValue = 'Male';
  data: any;
  error=";"
  
  
  constructor(private fb: FormBuilder, private api:UserService) { }

  ngOnInit() {
    this.UserForm = this.fb.group({
      Email: ['', [Validators.email, Validators.required]],
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      // checkPassword: ['', [Validators.required, this.confirmationValidator]],
      Birth:['', [Validators.required]],
      Sex:['', [Validators.required]],
      NationalID: ['86'],
      Phone: ['', [Validators.required]],
      Height: ['', [Validators.required]],
      
    });
  }
    
  
  submitForm(): void {
    for (const i in this.UserForm.controls) {
      this.UserForm.controls[i].markAsDirty();
      // this.UserForm.controls[i].updateValueAndValidity();
    }
    this.data = this.UserForm.value;
    this.data.NationalID = parseInt(this.data.NationalID);
    this.data.Height = parseFloat(this.data.Height);

    console.log(this.data);
    
    this.api.addUser(this.data).then(()=> alert("Thêm thành công"),(error) => console.log(error));
    
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.UserForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.UserForm.controls.Password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  

}
