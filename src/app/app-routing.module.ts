import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),

   },
  {
    path: 'tournament',
    loadChildren: () => import('./allnewpages/tournament/tournament.module').then( m => m.TournamentPageModule)
  },
  {
    path: 'registerpage',
    loadChildren: () => import('./allnewpages/registerpage/registerpage.module').then( m => m.RegisterpagePageModule)
  },
  {
    path: 'manage-team',
    loadChildren: () => import('./allnewpages/manage-team/manage-team.module').then( m => m.ManageTeamPageModule)
  },
  {
    path: 'add-team',
    loadChildren: () => import('./allnewpages/add-team/add-team.module').then( m => m.AddTeamPageModule)
  },
  {
    path: 'add-player',
    loadChildren: () => import('./allnewpages/add-player/add-player.module').then( m => m.AddPlayerPageModule)
  },
  {
    path: 'apply-tournament',
    loadChildren: () => import('./allnewpages/apply-tournament/apply-tournament.module').then( m => m.ApplyTournamentPageModule)
  },
  {
    path: 'matchdetails',
    loadChildren: () => import('./allnewpages/matchdetails/matchdetails.module').then( m => m.MatchdetailsPageModule)
  },  {
    path: 'login',
    loadChildren: () => import('./allnewpages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./allnewpages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'errorpage',
    loadChildren: () => import('./allnepages/errorpage/errorpage.module').then( m => m.ErrorpagePageModule)
  },

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
