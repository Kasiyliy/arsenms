import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToastService} from '../../../services/toast.service';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit, OnDestroy{

  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router) {
  }


  registerForm: FormGroup;

  ngOnInit() {
    this.authService.removeAll();
    this.registerForm = this.builder.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, Validators.required],
      cpassword: [null, Validators.required],
      password: [null, Validators.required],
    }, {
      validator: MustMatch('password', 'cpassword')
    });
  }

  register() {
    const user = new User();
    user.email = this.registerForm.get('email').value;
    user.first_name = this.registerForm.get('name').value;
    user.password = this.registerForm.get('password').value;
    user.cpassword = this.registerForm.get('cpassword').value;

    this.authService.register(user).subscribe(success => {
      this.toastService.presentInfoToast('Зарегистрированы!');
      this.registerForm.reset();
      this.router.navigate(['/auth']);
    }, err => {
      console.log(err);
      this.toastService.presentInfoToast('Произошла ошибка!');
    });


  }

  ngOnDestroy(): void {
    this.registerForm.reset();
  }


}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}