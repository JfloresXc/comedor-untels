import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'src/app/firebase';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';

const CODE_PASSWORD_NOT_FOUND = 'auth/user-not-found';

@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.component.html',
  styleUrls: ['./forgotten.component.css'],
})
export class ForgottenComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  matcher = new MyErrorStateMatcher();

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {}

  getForm() {
    return this.form.controls;
  }

  async submit() {
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
        this.form.reset();
      }
    } catch (error: any) {
      const code = error?.code;
      if (CODE_PASSWORD_NOT_FOUND === code) {
        this.alertService.openSnackBar('❌ Correo no encontrado ❌');
      }
    }
  }
}
