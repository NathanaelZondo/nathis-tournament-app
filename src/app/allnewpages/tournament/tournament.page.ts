import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
})
export class TournamentPage implements OnInit {

  constructor() { }
fixture =[];
obj:any ={};
  ngOnInit() {

    firebase.firestore().collection('MatchFixtures').get().then(res=>{
      res.forEach(val=>{
       

        let ndate = new Date(val.data().matchdate);
        
        this.obj =val.data();
        this.obj.matchtime =ndate.toLocaleTimeString();



        this.obj.matchdate=' '+ndate.toLocaleDateString();
        console.log(this.obj.matchdate)
        console.log("Time = ",ndate.toLocaleDateString())
        console.log({...this.obj,...{id:val.id}})
        this.fixture.push({...this.obj,...{id:val.id}})
      })
    })
  }

  currentmatch(item)
  {
console.log(item)

  }


}
