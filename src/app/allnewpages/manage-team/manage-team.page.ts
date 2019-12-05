import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.page.html',
  styleUrls: ['./manage-team.page.scss'],
})
export class ManageTeamPage implements OnInit {
isTeam = false;
isNotTeam = false
db = firebase.firestore();
display = {}
isPlayer = false
players = []
  constructor(    private formBuilder: FormBuilder, public router : Router) { 
 
    
  }

  ngOnInit() {
    this.getTeam();
  }
  addTeam(){
    this.router.navigateByUrl('add-team');
  }
  viewPlayer(){
    console.log('see');
    
  }
  addPlayer(){
    this.router.navigateByUrl('add-player');
  }
getTeam(){
let user 

  this.db.collection('Teams').doc(firebase.auth().currentUser.uid).get().then(res =>{
    if(res.exists){
     console.log(res.data());
     this.isTeam = true;
     this.display = res.data();
     
    //  this.isNotTeam = false;
    }
    this.db.collection('Teams').doc(firebase.auth().currentUser.uid).collection('Players').onSnapshot(res =>{
      this.players = []
      if(!res.empty){
        res.forEach(doc =>{
this.players.push(doc.data())
console.log('players', this.players);

          this.isPlayer = true
        })
      }
    })
  })
}
}
