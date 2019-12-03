import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
profile = {
  fullName: '',
image: ''
}
role = ''
  constructor() { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
firebase.auth().onAuthStateChanged(res =>{
  if(res){
    firebase.firestore().collection('members').doc(res.uid).get().then( res=>{
this.profile.fullName = res.data().form.fullName;
if(res.data().form.role =='vendor'){
this.role = 'vendor';
}else{
  this.role = 'teamManager';
}
    })
  }
})
  }
}
