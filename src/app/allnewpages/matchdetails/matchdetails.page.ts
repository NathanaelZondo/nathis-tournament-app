import { Component, OnInit } from '@angular/core';
import { AllserveService } from 'src/app/allservices/allserve.service';
import * as firebase from 'firebase';
import { Subscription, Observable, observable, timer } from 'rxjs';
import { LoadingController, IonicModule, Platform } from '@ionic/angular';
@Component({
  selector: 'app-matchdetails',
  templateUrl: './matchdetails.page.html',
  styleUrls: ['./matchdetails.page.scss'],
})
export class MatchdetailsPage implements OnInit {
  currentmatch = this.allserve.currentmatch;
  sub: Subscription;
  timer;
  cmatch = [];
  constructor(public plt: Platform, public allserve: AllserveService) {
    this.cmatch.push(this.currentmatch);
    console.log(this.cmatch)

    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.sub = timer(0, 19000).subscribe(result => {

        console.log('docid = ', this.currentmatch.id)

        firebase.firestore().collection('MatchFixtures').doc(this.currentmatch.id).onSnapshot(res => {
          // console.log(res.data())
          this.timer = res.data().timer;
        })
      }
      )
    })

  }

  ngOnInit() {

  }

}
