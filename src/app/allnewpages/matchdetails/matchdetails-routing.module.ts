import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchdetailsPage } from './matchdetails.page';

const routes: Routes = [
  {
    path: '',
    component: MatchdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchdetailsPageRoutingModule {}
