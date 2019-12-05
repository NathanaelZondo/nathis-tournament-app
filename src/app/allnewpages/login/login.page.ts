import { Component, OnInit } from '@angular/core';
import { AuthSeriveService } from 'src/app/services/auth-serive.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase'
declare var window
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  db = firebase.firestore()
  registrationForm
  phoneNumber = ''
  password
  smsSent
  confirmationResult = ''
  inputCode
  fullName 
  uid 
  role 
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier
  constructor(
    public authService: AuthSeriveService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public route :Router,
    public loadingController : LoadingController
  ) { 
    this.registrationForm = formBuilder.group({
      phoneNumber: [this.phoneNumber, Validators.compose([Validators.required])],
     
    })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
   
      duration: 2000,
      message: 'Please wait...',
      translucent: true,
     
    });
    return await loading.present();
  }
  ngOnInit() {
  }
  requestCode(){
    // this.phoneNumber = this.registrationForm.get('phoneNumber').value
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.phoneNumber, appVerifier).then(result => {
      if(result.success === true){
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
      }
    })
  }
  logins(code){
    if(this.confirmationResult !== ''){
      return this.authService.login(code, this.confirmationResult).then(result => {
        console.log(result);
      })
    }
  }
​
  addUser(form){
    // this.phoneNumber = this.registrationForm.get('phoneNumber').value
    // this.fullName = this.registrationForm.get('fullName').value
    // this.role = this.registrationForm.get('role').value

this.phoneNumber = form.phoneNumber
    console.log('object',this.phoneNumber );
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('checking here');
      },
      'expired-callback': () => {
        console.log('capcha expired');s
        
      }
    });
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.phoneNumber, appVerifier).then(result => {
      if(result.success === true){
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
      
       this.alert(form);
      
      }
    })
  }
​
  async alert(form){
    const alert = await this.alertController.create({
      header: 'Verfification code',
      // subHeader: 'Enter verification code',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Enter code'
        }],
      buttons: [{
        text: 'Submit',
        role: 'submit',
        cssClass: 'secondary',
        handler: (result) => {
          console.log(result.code);
          this.logins(result.code);
//           firebase.auth().onAuthStateChanged(res =>{
  
//             if(res.uid ){
// this.db.collection('members').doc(res.uid).set({form})
//               console.log('see ',res.uid);
//             }
//           })
          this.route.navigateByUrl('/home');
          this.presentLoading()
        }
      }]
    });
    await alert.present();
  }
​
  login(){
    this.phoneNumber = this.registrationForm.get('phoneNumber').value
        console.log(this.phoneNumber)
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    firebase.auth().signInWithPhoneNumber(String(this.phoneNumber), appVerifier).then(confirmationResult => {
      window.confirmationResult = confirmationResult;  
    }).catch((error) => {
      console.log(error)
    });
  }
  close() {
    this.route.navigateByUrl('home');
  }
}
