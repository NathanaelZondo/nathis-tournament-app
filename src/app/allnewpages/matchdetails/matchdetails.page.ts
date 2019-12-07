import { Router } from '@angular/router';
import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import { AllserveService } from 'src/app/allservices/allserve.service';
import * as firebase from 'firebase';
import { Subscription, Observable, observable, timer } from 'rxjs';
import { LoadingController, IonicModule, Platform, NavController } from '@ionic/angular';
@Component({
  selector: 'app-matchdetails',
  templateUrl: './matchdetails.page.html',
  styleUrls: ['./matchdetails.page.scss'],
})
export class MatchdetailsPage implements OnInit {
  // CSS 
  matchView = 'lineup';
  playerView = false;
  playerViewDiv = document.getElementsByClassName('viewPlayer')
  // _____________________________
  currentmatch = this.allserve.currentmatch;
  sub: Subscription;
  timer;
  cmatch = [];
  matchstats = [];
  tempArray = []
  constructor(public plt: Platform, public allserve: AllserveService, public router: NavController, public zone: NgZone, public renderer: Renderer2) {
    this.matchstats = [];

    this.cmatch.push(this.currentmatch);
    console.log(this.cmatch)


    this.sub = timer(0, 9000).subscribe(result => {
      // console.log('docid = ', this.currentmatch.id)

      // console.log('docid = ',this.currentmatch.id)

      // firebase.firestore().collection('MatchFixtures').doc(this.currentmatch.id).onSnapshot(res=>{
      //   // console.log(res.data())
      //   this.timer =res.data().timer;
      // })
    })
  }
  ngOnInit() {
    while (this.tempArray.length < 10) {
      this.tempArray.unshift('card')
    }
  }
  score;
  ascore;
  goals = [];
  agoals = [];
  ionViewDidEnter() {
    // firebase.firestore().collection('Top4').where("Tournament","==",this.currentmatch.Tournament).get().then(val=>{

    //   val.forEach(res=>{
    //  console.log(res.data())
    //  this.score =res.data().score;
    //  this.ascore =res.data().ascore;
    //     this.matchstats.push(res.data());

    //     this.agoals =res.data().agoal;
    //     this.goals =res.data().goal;

    //   })

    //           })
  }
  segmentChanged(state) {
    this.zone.run(() => {
      let summaryORlineup = state;
      switch (summaryORlineup) {
        case 'lineup':
          this.matchView = summaryORlineup
          console.log('viewing ', summaryORlineup);
          break;
        case 'summary':
          this.matchView = summaryORlineup
          console.log('viewing ', summaryORlineup);
          break;
        default:
          break;
      }
    })
  }
  viewPlayer(state, side, data) {
    switch (state) {
      case 'open':
      this.playerView = true;
      
      this.renderer.setStyle(this.playerViewDiv[0],'display','flex')
        break;
      case 'close':
        this.playerView = false;
      
        setTimeout(() => {
          this.renderer.setStyle(this.playerViewDiv[0],'display','none')
        }, 500);
        break;
    }
  }
  back() {
    this.router.navigateBack('tournament')
  }
}
