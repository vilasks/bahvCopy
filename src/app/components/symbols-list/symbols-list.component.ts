import { Component, OnInit } from '@angular/core';
import { SymbolsService } from 'src/app/services/symbols-services/symbols.service';
@Component({
  selector: 'app-symbols-list',
  templateUrl: './symbols-list.component.html',
  styleUrls: ['./symbols-list.component.css']
})
export class SymbolsListComponent implements OnInit {

  constructor(private symbolsService:SymbolsService) { }
  symbols:any = [];
  ngOnInit(): void {
    this.getSymbols()
  }

  getSymbols(){
    this.symbolsService.Symbols.subscribe(
      {
        next:(v) => {
          this.symbols = v
        }
      }
    )
  }

}
