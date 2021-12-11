import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from 'src/app/Services/auth.service';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { DashbaordRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent, MyProfileComponent],
  imports: [
    DashbaordRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CommonModule,
  ],
  providers: [AuthService],
  bootstrap: [],
})
export class DashbaordModule {}
