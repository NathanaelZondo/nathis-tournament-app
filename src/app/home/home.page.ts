import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { menuController } from '@ionic/core';
import { MenuComponent } from '../components/menu/menu.component';
import * as firebase from 'firebase';
import { PassInformationService } from '../services/pass-information.service';
import { AuthSeriveService } from '../services/auth-serive.service';
import { findWires } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
popover1;
db = firebase.firestore()
role
user
  constructor(public router:Router,public popoverController: PopoverController,public pass : PassInformationService, public auth: AuthSeriveService) {

// this.router.navigate(['tournament']);
// console.log('uid',firebase.auth().currentUser.uid);
// this.getUserProfile()
this.user = firebase.auth().currentUser.uid
this.auth.setUser(this.user);
this.getUserProfile()
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
getUserProfile() {
  this.db.collection('members').doc(this.auth.getUser()).get().then(res => {
    this.pass.role = res.data().form.role;
   this.pass.profile = res.data()
    console.log('role',this.role);
    
  })
}
}
