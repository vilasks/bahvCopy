import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SymBlockComponent } from './components/sym-block/sym-block.component';
import { SymbolsListComponent } from './components/symbols-list/symbols-list.component';
import { ChartingBlockComponent } from './components/charting-block/charting-block.component';
import { ChartComponent } from './components/chart/chart.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BitesComponent } from './components/bites/bites.component';
import { HighLowCardsComponent } from './components/high-low-cards/high-low-cards.component';
import { HeatCalenderComponent } from './components/heat-calender/heat-calender.component'
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CalenderItemComponent } from './components/calender-item/calender-item.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import Auth from './guards/auth.guard';
import TokenInterceptor from './interceptors/token.interceptor';
import { ToastrModule} from 'ngx-toastr';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SymBlockComponent,
    SymbolsListComponent,
    ChartingBlockComponent,
    ChartComponent,
    BitesComponent,
    HighLowCardsComponent,
    HeatCalenderComponent,
    SearchComponent,
    CalenderItemComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    ProfileDetailsComponent,
    SettingsComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    ToastrModule.forRoot()
  ],
  providers: [Auth,{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
