import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  user_uuid!: string | null;

  email!: string | null;
  constructor(
    private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute
  ) {
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user_uuid = user.uid;
    this.email = user.email;
  }

  ngOnInit(): void {}

  navigateToProfile() {
    this.router.navigate(['myprofile'], { relativeTo: this.route });
  }
}
