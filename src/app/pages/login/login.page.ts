import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

  // Initialize Firebase
  app = initializeApp(environment.firebase);

  auth = getAuth(this.app);

  constructor( private alert: AlertController, private router: Router ) { }

  login () {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
    .then(({ user }) => this.loginSuccess( user ))
    .catch(error => this.loginError(error));
  }

  loginSuccess( _user: User) {
    this.alert.create({
      header: 'Bienvenido',
      message: `${_user.email}`,
      buttons: [{
        text: "Aceptar",
        role: "confirm",
        handler: () => this.router.navigate(['/products'])
      }]
    }).then(el => el.present());
  }

  loginError(error: any) {
    this.alert.create({
      header: "Error",
      message: `Error Code: ${error.code} - ${error.message}`,
      buttons: [{
        text: "Aceptar",
        role: "cancel"
      }]
    }).then(el => el.present());
  }

  ngOnInit() {
    console.log("Iniciando login...");

  }

}
