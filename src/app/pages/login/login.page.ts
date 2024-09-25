import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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

  constructor(private alert: AlertController, private router: Router ) { }

  login () {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.alert.create({
        header: 'Bienvenido',
        message: `${userCredential.user.email}`,
        buttons: [{
          text: "Aceptar",
          role: "confirm",
          handler: () => this.router.navigate(['/home'])
        }]
      }).then((el) => {
        el.present();
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  ngOnInit() {
    console.log("Iniciando login...");

  }

}
