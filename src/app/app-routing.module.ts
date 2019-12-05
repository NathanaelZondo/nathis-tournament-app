import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'tournament', loadChildren: () => import('./allnewpages/tournament/tournament.module').then( m => m.TournamentPageModule)},
  { path: 'matchdetails', loadChildren: () => import('./allnewpages/matchdetails/matchdetails.module').then( m => m.MatchdetailsPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
