import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthSeriveService } from 'src/app/services/auth-serive.service';
import { LoadingController } from '@ionic/angular';
import { PassInformationService } from 'src/app/services/pass-information.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
showextendedMenu = false
showextendedMenu1 = false
role = 'user'
db = firebase.firestore()
getUser
user
  constructor(private router: Router,
    private authservice: AuthSeriveService,
    public loadingController: LoadingController,
   public passService : PassInformationService,
   public auth  : AuthSeriveService) { 

//       this.user = firebase.auth().currentUser.uid
// this.auth.setUser(this.user);
// this.getUserProfile();
//   }
//   getUserProfile() {
//     this.db.collection('members').doc(this.authservice.getUser()).get().then(res => {
//      this.role = res.data().role
//       console.log('menu role',this.role);
      
//     })
  }

  ngOnInit() {
   console.log('mana',this.passService.role);
   
this.role = this.passService.role;
    
   
  }
  register(){
this.router.navigateByUrl('registerpage');

  }
  manageteam(){
    this.router.navigateByUrl('manage-team');
  }
  applyTournament(){
    this.router.navigateByUrl('apply-tournament');
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      // spinner: null,
      duration: 2000,
      message: 'Loading you out...',
    });
    return await loading.present();
  }
  signout(): void {
  firebase.auth().signOut().then(()=>{
    this.presentLoadingWithOptions();
    this.router.navigateByUrl('home').catch(err=>{
      console.log(err);
      
    })
  })
}
}
export interface Profile {
  form: { name : string}
}