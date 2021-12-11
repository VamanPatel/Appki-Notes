import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public router: Router,
    private snak: MatSnackBar
  ) {}

  ngOnInit(): void {}

  Login(email: any, password: any) {
    this.authService.SignIn(email, password).then((i) => {
      this.router.navigate(['/dashboard']);
    });
  }
}
