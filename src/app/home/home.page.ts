import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { menuController } from '@ionic/core';
import { MenuComponent } from '../components/menu/menu.component';
import * as firebase from 'firebase';
import { PassInformationService } from '../services/pass-information.service';
import { AuthSeriveService } from '../services/auth-serive.service';
import { findWires } from 'selenium-webdriver/firefox';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
popover1;
db = firebase.firestore()
role
user
temporaryArray = []
  constructor(public router:Router,
    public popoverController: PopoverController,
    public pass : PassInformationService, 
    public auth: AuthSeriveService,
    public fcm: FCM,
    public ngZone: NgZone) {

// this.router.navigate(['tournament']);
// console.log('uid',firebase.auth().currentUser.uid);
// this.getUserProfile()
// this.user = firebase.auth().currentUser.uid


  }
async  popover(){
  this. popover1 = await this.popoverController.create({
    component: MenuComponent,
    translucent: true
  });
  return await this.popover1.present();

  }
  
ionViewWillLeave()
{
  this.popover1.dismiss(); 
}
getToken(){
  this.fcm.getToken().then(token => {
  console.log(token);
  this.db.collection('fcmTokens').add({
    token: token,
    uid: ''
  })
  });
  
}
ngOnInit(){
  this.ngZone.run(()=>{
    this.auth.setUser(this.user);
    // this.getUserProfile();
  })
  while (this.temporaryArray.length < 20) {
    this.temporaryArray.push('card')
  }

  this.getToken();
  setTimeout(() => {
    console.log('home', this.pass.role);
  }, 500);
}
addTeam() {
  this.router.navigateByUrl('add-team');
}
viewTournament() {
  this.router.navigateByUrl('tournament')
}
// getUserProfile() {
//   this.db.collection('members').doc(this.auth.getUser()).get().then(res => {
//     this.pass.role = res.data().form.role;
//    this.pass.profile = res.data()
//     console.log('mmmmm',this.role);
    
//   })
// }
}
