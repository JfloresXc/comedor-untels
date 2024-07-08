import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rol: new FormControl('usuario', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();
  hide = true;
  showEmailError = false;
  showPasswordError = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  getForm() {
    return this.form.controls;
  }

  handleFocusOut(controlName: string) {
    const control = this.getForm()[controlName];

    if (control.invalid && control.hasError('required')) {
      if (controlName === 'email') {
        this.showEmailError = true;
        setTimeout(() => {
          this.showEmailError = false;
        }, 3000);
      }
      if (controlName === 'password') {
        this.showPasswordError = true;
        setTimeout(() => {
          this.showPasswordError = false;
        }, 3000);
      }
    }
  }

  submit() {
    if (this.form.valid) {
      const { email, password, rol } = this.form.value;
      this.authService.register(email, password, rol).then((response: any) => {
        this.form.reset();
        if (response) {
          this.form.setErrors(null);
        }
      });
    }
  }
}
