import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  //isAuthenticated = false;
  isLoginMode = true;
  isLoading = false;
  error: string = null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {

    } else {
      this.authService.signUp(email, password)
        .subscribe({
          next: reponseData => {
            console.log(reponseData)
            this.isLoading = false;
          },
          error: errMessage => {
            this.isLoading = false;
            this.error = errMessage;
          }});
    }

    this.isLoading = false;
    form.reset();
  }
}
