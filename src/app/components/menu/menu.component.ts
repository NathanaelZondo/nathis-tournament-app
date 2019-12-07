import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthSeriveService } from 'src/app/services/auth-serive.service';
import { LoadingController } from '@ionic/angular';
import { PassInformationService } from 'src/app/services/pass-information.service';
import { TouchSequence } from 'selenium-webdriver';
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
status
  constructor(private router: Router,
    private authservice: AuthSeriveService,
    public loadingController: LoadingController,
   public passService : PassInformationService,
   public auth  : AuthSeriveService,
   public ngZone: NgZone) { 

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
   this.ngZone.run(()=>{
    firebase.auth().onAuthStateChanged(res =>{
      if(res){
       this.role = this.passService.role;
       firebase.firestore().collection('members').doc(res.uid).get().then(snap =>
         {
           if(snap.exists){
             console.log('userProfile', res.uid, snap.data().status);
             this.status = snap.data().status
           }
          
         })
      }else{
        this.role = 'user';
        console.log('no user');
        
      }
    })
   })
  }
  profile(){
    if(this.status == 'awaiting'){
      this.router.navigateByUrl('errorpage')
    }else{
      this.router.navigateByUrl('profile');
    }
   
  }
  login(){
    this.router.navigateByUrl('login');
  }
  register(){
this.router.navigateByUrl('registerpage');
// this.router.navigateByUrl('manage-team');

  }
  manageteam(){
    if(this.status == 'awaiting'){
      this.router.navigateByUrl('errorpage')
    }else{
      this.router.navigateByUrl('manage-team');
    }
    
  }
  applyTournament(){
    if(this.status == 'awaiting'){
      this.router.navigateByUrl('errorpage')
    }else{
      this.router.navigateByUrl('apply-tournament');
    }
   
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      // spinner: null,
      duration: 2000,
      message: 'Loading you out...',
    });
    return await loading.present();
  }
  signout(){
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