import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
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
  user: any[] = [];

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private store: AngularFirestore
  ) {
    this.fieldEmail = new FormControl("", [<any>this.EmailValidator()]);
    this.fieldNewPassword = new FormControl("", [
      Validators.required,
      Validators.pattern("(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}"),
    ]);

    this.form = fb.group({
      fieldEmail: this.fieldEmail,
      fieldNewPassword: this.fieldNewPassword,
    });
  }

  ngOnInit(): void {
    this.getUser();
    var currentUser = this.authService.currentUserValue;
    console.log(currentUser);

    if (currentUser.length > 0) {
      this.router.navigate(["/dashboard"]);
      console.log("You are Logged In");
    } else {
      console.log("you are not logged in");
      this.router.navigate(["register-user"]);
    }
  }

  EmailValidator() {
    return (control: FormControl) => {
      if (control.value) {
        if (!new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$").test(control.value)) {
          return { error: "Invalid email" };
        }
      }
      if (this.user) {
        console.log("user");
        var userFound = this.user.find((u) => {
          return u.result.email === this.fieldEmail.value;
        });
        console.log(userFound, "userfound");
        var findEmail = userFound?.result.email.includes(this.fieldEmail.value);
        console.log(findEmail);
        if (findEmail) {
          return { userExists: "User is Already Exists" };
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

  getUser() {
    this.store
      .collection("users")
      .snapshotChanges()
      .subscribe((i) => {
        this.user = i.map((u) => {
          return Object.assign({
            uid: u.payload.doc.id,
            result: u.payload.doc.data(),
          });
        });

        console.log(this.user);
      });
  }
}
