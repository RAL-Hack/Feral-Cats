import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent implements OnInit {

  public adminLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]

  });
  constructor(public fb: FormBuilder, private router: Router) { }
  submitAdmin(event) {
    if (this.adminLogin.value['username'] == 'username' && this.adminLogin.value['password'] == 'password') {
      console.log(true)
      this.router.navigate(['/selection-options'])
    }
    console.log(this.adminLogin.value);
  }


  ngOnInit() {
  }

}
