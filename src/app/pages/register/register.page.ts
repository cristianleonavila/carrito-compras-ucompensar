import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  // Initialize Firebase
  app = initializeApp(environment.firebase);

  auth = getAuth(this.app);

  constructor( private alert: AlertController, private router: Router ) { }

  register() {
    try {
      if ( this.password !== this.confirmPassword ) {
        throw { code: 0, message: "La clave no coincide"};
      }
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(({user}) => this.registerSuccess(user))
      .catch(error => this.registerError(error));
    } catch (error) {
      this.registerError(error);
    }
  }

  registerSuccess( _user: User) {
    this.alert.create({
      header: 'Registro exisoso',
      message: `El usuario ${_user.email} fué creado correctamente`,
      buttons: [{
        text: "Aceptar",
        role: "confirm",
        handler: () => this.router.navigate(['/login'])
      }]
    }).then(el => el.present());
  }

  registerError(error: any) {
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
    console.log("Iniciando registro...");

  }

}
