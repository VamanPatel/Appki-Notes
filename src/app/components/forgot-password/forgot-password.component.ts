import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  fieldEmail!: FormControl;
  constructor(public authService: AuthService, private fb: FormBuilder) {
    this.fieldEmail = new FormControl('', [<any>this.EmailValidator()]);

    this.form = fb.group({
      fieldEmail: this.fieldEmail,
    });
  }

  ngOnInit(): void {}

  EmailValidator() {
    return (control: FormControl) => {
      if (control.value) {
        if (
          !new RegExp(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ).test(control.value)
        ) {
          return { error: 'Invalid email' };
        }
      }
      return null;
    };
  }

  get isSignup() {
    if (this.fieldEmail.valid) {
      return false;
    } else {
      return true;
    }
  }
}
