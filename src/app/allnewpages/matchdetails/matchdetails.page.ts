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
  constructor(public plt:Platform,public allserve:AllserveService ) {

  
this.cmatch.push(this.currentmatch);
console.log(this.cmatch)

    this.plt.ready().then(() =>{
      this.sub = timer(0,1000).subscribe(result =>{
       






console.log('docid = ',this.currentmatch.id)

        firebase.firestore().collection('MatchFixtures').doc(this.currentmatch.id).get().then(val=>{

          // val.forEach(res=>{
          //   console.log({id:res.id,...res.data()})
          //   this.timer=res.data();
          //   this.docid =res.id;
          //   console.log("time = ",this.timer)
          // })
          // console.log(val.data())
this.timer =val.data().timer;
          console.log(val.data().timer)
          

        })
    
    
    
        









      }
      )})




   }

  ngOnInit() {

  }

}
