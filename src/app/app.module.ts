import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SymBlockComponent } from './components/sym-block/sym-block.component';
import { SymbolsListComponent } from './components/symbols-list/symbols-list.component';
import { ChartingBlockComponent } from './components/charting-block/charting-block.component';
import { ChartComponent } from './components/chart/chart.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BitesComponent } from './components/bites/bites.component';
import { HighLowCardsComponent } from './components/high-low-cards/high-low-cards.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SymBlockComponent,
    SymbolsListComponent,
    ChartingBlockComponent,
    ChartComponent,
    BitesComponent,
    HighLowCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
