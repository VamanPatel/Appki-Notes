import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  fieldEmail!: FormControl;
  fieldNewPassword!: FormControl;

  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.fieldEmail = new FormControl("", [<any>this.EmailValidator()]);
    this.fieldNewPassword = new FormControl("", [Validators.required]);

    this.form = fb.group({
      fieldEmail: this.fieldEmail,
      fieldNewPassword: this.fieldNewPassword,
    });
  }

  ngOnInit(): void {
    var currentUser = this.authService.currentUserValue;
    console.log(currentUser);

    if (currentUser.length > 0) {
      this.router.navigate(["/dashboard"]);
      console.log("You are Logged In");
    } else {
      console.log("you are not logged in");
    }
  }

  EmailValidator() {
    return (control: FormControl) => {
      if (control.value) {
        if (!new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$").test(control.value)) {
          return { error: "Invalid email" };
        }
      }
      return null;
    };
  }

  get isSignup() {
    if (this.fieldNewPassword.valid && this.fieldEmail.valid) {
      return false;
    } else {
      return true;
    }
  }
}
