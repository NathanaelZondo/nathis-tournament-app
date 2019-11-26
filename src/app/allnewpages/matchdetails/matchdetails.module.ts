import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchdetailsPageRoutingModule } from './matchdetails-routing.module';

import { MatchdetailsPage } from './matchdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchdetailsPageRoutingModule
  ],
  declarations: [MatchdetailsPage]
})
export class MatchdetailsPageModule {}
