import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SymbolsListComponent } from './components/symbols-list/symbols-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import Auth from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';

const routes: Routes = [
  {path:"", canActivate: [Auth], component:HomeComponent},
  {path: "signup",   component: SignupComponent},
  {path: "signin", component: SigninComponent},
  {path: "profile", canActivate: [Auth], component: ProfileDetailsComponent},
  {path: "settings", canActivate: [Auth], component: SettingsComponent},
  {path:"stock/:data", canActivate: [Auth], component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
