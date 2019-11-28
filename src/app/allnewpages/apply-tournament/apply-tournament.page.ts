import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
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
  constructor(public pass: PassInformationService, public alertController: AlertController, public authService : AuthSeriveService ,public passService : PassInformationService) { }

  ngOnInit() {
    this.checkForTournaments();
    //this.getUserProfile();
    this.geTeamProfile();
console.log('blah bal',this.passService.role);
console.log('blah ++++',this.passService.profile);
  }

  async applyForTournament(value) {
    console.log('item', value)
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
            if(this.passService.role == 'vendor'){
              this.db.collection('newTournaments').doc(value.docid).collection('vendorApplications').doc(firebase.auth().currentUser.uid).set({
                vendorObject: this.passService.profile,
                refNumber: r
              }).then(res => {
                console.log('lets see', value.doc.formInfo.tournamentName, some);
              })
            }else 
            this.db.collection('newTournaments').doc(value.docid).collection('teamApplications').doc(firebase.auth().currentUser.uid).set({
              TeamObject: this.userObj,
              refNumber: r
            }).then(res => {
              console.log('lets see', value.doc.formInfo.tournamentName, some);
            })
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }


  checkForTournaments() {
    let obj = {
      docid: null,
      doc: null,
      isApplied: false
    }
    this.db.collection('newTournaments').where('approved', '==', true).get().then(res => {

      if (!res.empty) {
        this.applytournaments  = []
        res.forEach(document => {
          console.log('data', document.data());
          console.log('res', this.applytournaments);

          if(this.passService.role=='vendor'){
   this.db.collection('newTournaments').doc(document.id).collection('vendorApplications').doc(firebase.auth().currentUser.uid).get().then(res => {
            console.log('applied tournaments', res.data());
            if (res.exists) {
              obj = {
                docid:  document.id,
                doc: document.data(),
                isApplied: true
              }
              this.applytournaments.push(obj)
            } else {
              obj = {
                docid:  document.id,
                doc: document.data(),
                isApplied: false
              }
              this.applytournaments.push(obj)
            }
          })
          }else if (this.passService.role=='teamManager'){
            this.db.collection('newTournaments').doc(document.id).collection('teamApplications').doc(firebase.auth().currentUser.uid).get().then(res => {
              console.log('applied tournaments', res.data());
              if (res.exists) {
                obj = {
                  docid:  document.id,
                  doc: document.data(),
                  isApplied: true
                }
                this.applytournaments.push(obj)
              } else {
                obj = {
                  docid:  document.id,
                  doc: document.data(),
                  isApplied: false
                }
                this.applytournaments.push(obj)
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

}
