import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  matcher = new MyErrorStateMatcher();
  hide = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.user.email) {
      this.route.navigate(['/']);
    }
  }

  getForm() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email, password).then((response) => {
        if (!response) this.form.reset();
      });
    }
  }

  async forgotPassword() {
    this.route.navigate(['/forgotten']);
  }
}
