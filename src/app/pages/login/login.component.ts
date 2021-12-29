import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'src/app/firebase';
import { AlertService } from 'src/app/services/alert/alert.service';

const CODE_PASSWORD_NOT_FOUND = 'auth/user-not-found';

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
    private route: Router,
    private alertService: AlertService
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
    try {
      if (!this.form.value.email) {
        this.alertService.openSnackBar('❌ Ingrese un correo en el campo ❌');
      } else if (this.getForm().email.hasError('email')) {
        this.alertService.openSnackBar('❌ Ingrese correo válido ❌');
      } else {
        const email = this.form.value.email;
        await sendPasswordResetEmail(auth, email);
        this.alertService.openSnackBar(
          '✅ Revisar correo para cambiar contraseña ✅'
        );
      }
    } catch (error: any) {
      const code = error?.code;
      if (CODE_PASSWORD_NOT_FOUND === code) {
        this.alertService.openSnackBar('❌ Correo no encontrado ❌');
      }
    }
  }
}
