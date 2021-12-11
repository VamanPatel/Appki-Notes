import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'angular-firebase';
  loading: boolean = false;
  isEdit: boolean = false;
  user_uuid!: string | null;

  email!: string | null;
  form!: FormGroup;

  noteName!: FormControl;
  noteDescription!: FormControl;

  dataSource: any;
  id: any;
  name: any;
  personalInfo: any;
  editObj: any;

  @ViewChild('btnShow')
  btnShow!: ElementRef;
  @ViewChild('btnClose')
  btnClose!: ElementRef;

  constructor(
    private store: AngularFirestore,
    private spinner: NgxSpinnerService,
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.noteName = new FormControl('', [Validators.required]);
    this.noteDescription = new FormControl('', [Validators.required]);

    this.form = fb.group({
      noteName: this.noteName,
      noteDescription: this.noteDescription,
    });
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user_uuid = user.uid;
    this.email = user.email;
    this.getAll();
  }

  navigateToProfile() {
    this.router.navigate(['/myprofile']);
  }

  openDialog() {
    this.btnShow.nativeElement.click();
  }

  closeDialog() {
    this.btnClose.nativeElement.click();
  }

  clearEdit() {
    this.editObj = null;
    this.name = '';
    this.personalInfo = '';
  }

  add() {
    this.spinner.show();
    if (this.editObj) {
      this.store
        .collection('list')
        .doc('users')
        .collection(`${this.user_uuid}`)
        .doc(this.editObj.id)
        .update({ name: this.name, personalInfo: this.personalInfo });
      this.spinner.hide();
      this.clearEdit();
      this.isEdit = false;
    } else {
      this.store
        .collection('list')
        .doc('users')
        .collection(`${this.user_uuid}`)
        .add({ name: this.name, personalInfo: this.personalInfo });
      this.spinner.hide();
      this.clearEdit();
    }
    this.closeDialog();
  }

  edit(id: string) {
    this.isEdit = true;
    this.store
      .collection('list')
      .doc('users')
      .collection(`${this.user_uuid}`)
      .doc(id)
      .get()
      .subscribe((response) => {
        this.editObj = Object.assign({ id: response.id }, response.data());
        this.name = this.editObj.name;
        this.personalInfo = this.editObj.personalInfo;
        this.openDialog();
      });
  }

  delete(id: string) {
    this.store
      .collection('list')
      .doc('users')
      .collection(`${this.user_uuid}`)
      .doc(id)
      .delete();
  }

  getAll() {
    this.spinner.show();
    setTimeout(() => {
      this.store
        .collection('list')
        .doc('users')
        .collection(`${this.user_uuid}`)
        .snapshotChanges()
        .subscribe((response) => {
          this.dataSource = response.map((item) => {
            return Object.assign(
              { id: item.payload.doc.id },
              item.payload.doc.data()
            );
          });
          console.log(this.dataSource);
        });
      this.spinner.hide();
      this.loading = true;
    }, 1500);
  }

  get isAddUpdate() {
    if (this.noteName.valid && this.noteDescription.valid) {
      return false;
    } else {
      return true;
    }
  }
}
