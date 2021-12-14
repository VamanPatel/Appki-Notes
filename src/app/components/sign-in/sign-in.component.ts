import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";
import { UserResponse } from "src/app/shared/Modals/users.model";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  user!: UserResponse[];
  emailVerified!: boolean;
  email!: string;

  form!: FormGroup;
  fieldEmail!: FormControl;
  fieldNewPassword!: FormControl;

  constructor(
    public authService: AuthService,
    public router: Router,
    private snak: MatSnackBar,
    private store: AngularFirestore,
    private fb: FormBuilder
  ) {
    this.fieldEmail = new FormControl("", [Validators.required]);
    this.fieldNewPassword = new FormControl("", [Validators.required]);

    this.form = fb.group({
      fieldEmail: this.fieldEmail,
      fieldNewPassword: this.fieldNewPassword,
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  Login(email: any, password: any) {
    // var currentUser = this.user.find((o) => {
    //     return o.result.email === this.email;
    // });

    // console.log(currentUser);
    // if (currentUser) {
    //     if (currentUser?.result.emailVerified) {
    this.authService.SignIn(email, password).then((i) => {
      this.router.navigate(["/dashboard"]);
    });
    //     } else {
    //         this.snak.open("Please Verify Your Email , Check Indox!!", "Ok", { duration: 4000 });
    //     }
    // } else {
    //     this.snak.open("User not Found , Please SignUp!!", "ok", { duration: 3000 });
    // }
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
