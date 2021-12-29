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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  getForm() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const { email, password, rol } = this.form.value;
      this.authService.register(email, password, rol).then((response: any) => {
        this.form.reset();
        if (response) this.form.setErrors(null);
      });
    }
  }
}
