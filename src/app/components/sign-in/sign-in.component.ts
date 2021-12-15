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
    this.authService.SignIn(email, password);
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
