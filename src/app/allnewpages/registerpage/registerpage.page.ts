import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterFormComponent } from 'src/app/components/register-form/register-form.component';
import { UserCredential } from 'src/app/Models/user';
import { AuthSeriveService } from 'src/app/services/auth-serive.service';
import * as firebase from 'firebase'
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { async } from 'q';
import { Router } from '@angular/router';
declare var window
@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.page.html',
  styleUrls: ['./registerpage.page.scss'],
})
export class RegisterpagePage {
  phoneNumber = ''
  lastNum = ''
  password
  registrationForm
  smsSent
  confirmationResult = ''
  inputCode
  fullName 
  uid 
  role 
  db = firebase.firestore()
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier
  Profile ={
    number : '',
    fullName : '',
    uid : '',
    role :''

  }
  constructor(  
    public authService: AuthSeriveService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public route :Router,
    public loadingController: LoadingController

    ) {
      this.smsSent = false
​
      firebase.auth().languageCode = 'en';
​
  this.registrationForm = formBuilder.group({
    phoneNumber: [this.phoneNumber, Validators.compose([Validators.required])],
    fullName:['', Validators.required],
    role:['', Validators.required],
  })
​
  }
  ngOnInit() {
    // firebase.auth().onAuthStateChanged(res => {
    //   if (res) {
    //     this.profileService.storeAdmin(res);
    //     this.route.navigateByUrl('home', { skipLocationChange: true });
    //   }
    // });
  }
 
  requestCode(){
    // this.phoneNumber = this.registrationForm.get('phoneNumber').value
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.lastNum, appVerifier).then(result => {
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

   let number =  this.phoneNumber.substr(1)
    this.lastNum = '+' + 27 + number;
    console.log(number, ' s',);
    
    // this.phoneNumber = this.registrationForm.get('phoneNumber').value
    this.fullName = this.registrationForm.get('fullName').value
    this.role = this.registrationForm.get('role').value

// this.lastNum = form.phoneNumber
    console.log('object',this.lastNum );
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('checking here');
      },
      'expired-callback': () => {
        
      }
    });
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.lastNum, appVerifier).then(result => {
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
      backdropDismiss: false,
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
          firebase.auth().onAuthStateChanged(res =>{
  
            if(res.uid ){
this.db.collection('members').doc(res.uid).set({form, status: 'awaiting'})
              console.log('see ',res.uid);
            }
          })
this.presentLoading()
          this.route.navigateByUrl('/home');
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
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loging In',
      duration: 2000
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();

    // console.log('Loading dismissed!');
  }

}
