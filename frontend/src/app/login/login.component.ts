import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string;
  userLogin:string;
  message: string;

  constructor(public authService: AuthService, public router: Router) {
      this.setMessage();
  }

  ngOnInit() {

  }

  setMessage() {
      this.message = "Logged " + (this.authService.isLoggedIn ? "in" : "out");
  }

  login() {
      this.message = "Trying to log in ...";
      this.authService.login(this.password).subscribe(() => {
          this.setMessage();
          if (this.authService.isLoggedIn) {
              // Получение строки для перенаправления от сервиса
              // если строки нет перенаправляем на страницу по умолчнанию
              let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : "/admin";
              // перенапраление пользователя
              this.router.navigate([redirect]);
          }
      });
  }

  logout() {
      this.authService.logout();
      this.setMessage();
  }

}
