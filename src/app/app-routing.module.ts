import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SymbolsListComponent } from './components/symbols-list/symbols-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import Auth from './guards/auth.guard';

const routes: Routes = [
  {path: "signup",  component: SignupComponent},
  {path: "signin", component: SigninComponent},
  {path:":data", canActivate: [Auth], component:HomeComponent},
  {path:"", canActivate: [Auth], component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
