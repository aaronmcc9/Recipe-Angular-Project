import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

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

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: reponseData => {
        console.log(reponseData)

        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      error: errMessage => {
        this.isLoading = false;
        this.error = errMessage;
      }
    });

    this.isLoading = false;
    form.reset();
  }
}
