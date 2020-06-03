import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, AbstractControl, ValidationErrors} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(control: FormGroup) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({NoPassswordMatch: true});
    }
  }

  onSubmit(): void {

    if (this.registerForm.valid) {
      let url = 'http://localhost:8091/addUser';
      let person = {
        name: this.registerForm.get('firstName').value + ' ' + this.registerForm.get('lastName').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      };
      this.http.post<any>(url, person).subscribe();
      this.router.navigate(['/', 'login']);
      this.registerForm.reset();
    }
  }
}
