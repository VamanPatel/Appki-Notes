import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { User } from "../shared/services/user.";
import firebase from "firebase/compat/app";
import { MatSnackBar } from "@angular/material/snack-bar";
import { loginResponse } from "../shared/Modals/userLogin.modal";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData!: loginResponse;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private snak: MatSnackBar
  ) {}

  // Sign in with email/password
  SignIn(email: any, password: any) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user?.emailVerified, "user logged");

        if (result.user?.emailVerified) {
          this.SetUserData(result.user);
          this.router.navigate(["/dashboard"]);

          this.snak.open("You Are successfully LoggedIn", "ok", {
            duration: 2000,
          });
        } else {
          this.snak.open("Please Verify the Email , Check in Inbox or Junk!!", "ok", {
            duration: 2000,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.snak.open("User Not Found", "Cancel", { duration: 2000 });
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.snak.open("User is Register", "ok", { duration: 2000 });

        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.error(error);
        this.snak.open("Error While registering the User", "ok", {
          duration: 2000,
        });
      });
  }

  /* ---------------------- Send email verfificaiton when new user sign up ---------------------- */
  SendVerificationMail() {
    return this.afAuth.currentUser.then((i) => {
      i?.sendEmailVerification();
      this.router.navigate(["/verify-email-address"]);
    });
  }

  /* ---------------------------------- /Reset Forggot password --------------------------------- */
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /* ---------------- Returns true when user is looged in and email is verified ---------------- */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  /* ----------------------------------- Sign in with Google ----------------------------------- */
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  /* ---------------------------- Auth logic to run auth providers ---------------------------- */
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(["/dashboard"]);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    console.log(user);
    this.userData = user;
    localStorage.setItem("user_uuid", JSON.stringify(user.uid));
    localStorage.setItem("user_refreshTokaen", JSON.stringify(user.refreshToken));
    localStorage.setItem("user", JSON.stringify(user));

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  /* ----------------------------------------- Sign out ----------------------------------------- */
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.clear();

      this.router.navigate(["sign-in"]);
      console.log("removed");
    });
  }
}
