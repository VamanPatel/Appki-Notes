import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  userData!: any;

  constructor(private spinner: NgxSpinnerService, public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem("user") || "{}");
    this.userData = user;
  }

  goBack() {
    this.router.navigate(["/"]);
  }
}
