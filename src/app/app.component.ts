import { Component, NgZone } from '@angular/core';
import * as firebase from 'firebase'
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { config } from '../app/FirebaseConfig';
import { Router } from '@angular/router';
import { PassInformationService } from './services/pass-information.service';
import { Profile } from 'selenium-webdriver/firefox';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  role
   profile = {} as Profile 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    private pass : PassInformationService,
    public ngZone: NgZone
  ) {
    firebase.initializeApp(config)
    this.initializeApp();
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.router.navigateByUrl("/home");
        console.log('not logged in');
        
        unsubscribe();
      } else {
this.ngZone.run(()=>{
  this.router.navigateByUrl("/home");
  console.log('logged in');
  firebase.firestore().collection('members').doc(user.uid).get().then(res =>{
    if(res.exists){
      this.pass.role = res.data().form.role;
      console.log('role',  this.pass.role );
    }
 

  });
  unsubscribe();
})
  }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
export interface Profile  {
  name : string
}