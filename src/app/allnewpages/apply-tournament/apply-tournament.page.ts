import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { PassInformationService } from 'src/app/services/pass-information.service';
import { AuthSeriveService } from 'src/app/services/auth-serive.service';

@Component({
  selector: 'app-apply-tournament',
  templateUrl: './apply-tournament.page.html',
  styleUrls: ['./apply-tournament.page.scss'],
})
export class ApplyTournamentPage implements OnInit {
  db = firebase.firestore()
  applytournaments = []
  userObj = {}
  appliedForTourn = false
  profile = {
    fullName: '',
  image: ''
  }
  role = ''
  constructor(public pass: PassInformationService, 
    public alertController: AlertController, 
    public authService : AuthSeriveService ,
    public passService : PassInformationService,
    public loadingController: LoadingController) { }
    async presentLoading() {
      const loading = await this.loadingController.create({
     
        duration: 2000,
        message: 'Please wait...',
        translucent: true,
       
      });
      return await loading.present();
    }

  ngOnInit() {
    this.checkForTournaments();
    //this.getUserProfile();
    this.geTeamProfile();
    this.getProfile();
    setTimeout(() => {
      console.log('blah bal',  this.userObj);
    }, 1000);


  console.log('blah ++++',this.passService.role);


  }
  async presentTeamCreateAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'No team Found',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async applyForTournament(value) {
    console.log('item', value)
    if(!this.userObj && this.passService.role=='teamManager'){
console.log('you dont have a team');
this.presentTeamCreateAlert()
    }else{
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Apply for   ',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Apply',
            handler: () => {
              let r = Math.random().toString(36).substring(7).toUpperCase();
              let some = r
              if(this.role == 'vendor'){
                this.db.collection('newTournaments').doc(value.docid).collection('vendorApplications').doc(firebase.auth().currentUser.uid).set({
                  vendorObject: this.passService.profile,
                  refNumber: r
                }).then(res => {
                  console.log('lets see', value.doc.formInfo.tournamentName, some);
                })
              }else 
              this.db.collection('newTournaments').doc(value.docid).collection('teamApplications').doc(firebase.auth().currentUser.uid).set({
                TeamObject: this.userObj,
                refNumber: r,
                status: 'awaiting'
              }).then(res => {
                this.presentLoading();
                this.checkForTournaments();
                console.log('lets see', value.doc.formInfo.tournamentName, some);
  
              })
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }

  }


  checkForTournaments() {
    let obj = {
      docid: null,
      doc: null,
      isApplied: false,
      application: null
    }
    this.db.collection('newTournaments').where('approved', '==', true).get().then(res => {

      if (!res.empty) {
        this.applytournaments  = []
        res.forEach(document => {
          console.log('data', document.data());
          console.log('res', this.applytournaments);

          if(this.passService.role =='vendor'){
   this.db.collection('newTournaments').doc(document.id).collection('vendorApplications').doc(firebase.auth().currentUser.uid).get().then(res => {
            console.log('applied tournaments', res.data());
            if (res.exists) {
              obj = {
                docid:  document.id,
                doc: document.data(),
                isApplied: true,
                application: res.data()
              }
              this.applytournaments.push(obj)
            } else {
              obj = {
                docid:  document.id,
                doc: document.data(),
                isApplied: false,
                application: res.data()
              }
              this.applytournaments.push(obj)
            }
          })
          }else if (this.passService.role =='teamManager'){
            this.db.collection('newTournaments').doc(document.id).collection('teamApplications').doc(firebase.auth().currentUser.uid).get().then(res => {
              console.log('applied tournaments', res.data());
              if (res.exists) {
                obj = {
                  docid:  document.id,
                  doc: document.data(),
                  isApplied: true,
                  application: res.data()
                }
                this.applytournaments.push(obj)
              } else {
                obj = {
                  docid:  document.id,
                  doc: document.data(),
                  isApplied: false,
                  application: res.data()
                }
                this.applytournaments.push(obj)
                console.log('arrat',this.applytournaments);
                
              }
            })
          }
     
          //read for vendoers
       
        })
      }
    })
  }
  geTeamProfile() {
    this.db.collection('Teams').doc(firebase.auth().currentUser.uid).get().then(res => {
      this.userObj = res.data();
      this.userObj = res.data();
      console.log('userppp', res.data());
    })
  }
  getProfile(){
  
     
        firebase.firestore().collection('members').doc(firebase.auth().currentUser.uid).get().then( res=>{
    this.profile.fullName = res.data().form.fullName;
    if(res.data().form.role =='vendor'){
    this.role = 'vendor';
    }else{
      this.role = 'teamManager';
    }
        })
  
   
      }

}
