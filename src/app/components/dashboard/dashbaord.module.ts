import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ColorPickerModule } from "ngx-color-picker";
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthService } from "src/app/Services/auth.service";
import { MyProfileComponent } from "../my-profile/my-profile.component";
import { DashbaordRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
  declarations: [DashboardComponent, MyProfileComponent],
  imports: [
    DashbaordRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CommonModule,
    ColorPickerModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [AuthService],
  bootstrap: [],
})
export class DashbaordModule {}
