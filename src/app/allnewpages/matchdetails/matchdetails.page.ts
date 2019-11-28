import { Component, OnInit } from '@angular/core';
import { AllserveService } from 'src/app/allservices/allserve.service';
import * as firebase from 'firebase';
import { Subscription, Observable, observable,timer } from 'rxjs';
import { LoadingController, IonicModule, Platform } from '@ionic/angular';
@Component({
  selector: 'app-matchdetails',
  templateUrl: './matchdetails.page.html',
  styleUrls: ['./matchdetails.page.scss'],
})
export class MatchdetailsPage implements OnInit {
  currentmatch =this.allserve.currentmatch;
  sub :Subscription;
  timer;
  cmatch =[];
  matchstats =[];
  constructor(public plt:Platform,public allserve:AllserveService ) {
    this.matchstats =[];
  
this.cmatch.push(this.currentmatch);
console.log(this.cmatch)

 
      this.sub = timer(0,9000).subscribe(result =>{
       






console.log('docid = ',this.currentmatch.id)

        firebase.firestore().collection('MatchFixtures').doc(this.currentmatch.id).onSnapshot(res=>{
          // console.log(res.data())
          this.timer =res.data().timer;
        })
        
        
    
      })




   }

  ngOnInit() {

  }
score;
ascore;
  ionViewDidEnter()
  {
    firebase.firestore().collection('Top4').where("Tournament","==",this.currentmatch.Tournament).get().then(val=>{
      
      val.forEach(res=>{
     
     this.score =res.data().score;
     this.ascore =res.data().ascore;
        this.matchstats.push(res.data());
   
  
      })
      
              })
            
            
     
    
  }

}
