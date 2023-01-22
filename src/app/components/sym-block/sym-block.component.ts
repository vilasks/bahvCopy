import { Component, Input, OnInit } from '@angular/core';
import { SymbolsService } from 'src/app/services/symbols-services/symbols.service';

@Component({
  selector: 'app-sym-block',
  templateUrl: './sym-block.component.html',
  styleUrls: ['./sym-block.component.css']
})
export class SymBlockComponent implements OnInit {
  @Input() stock!:any
  constructor(private symbol:SymbolsService) { }
  ngOnInit(): void {
  }

  changeStock(){
    this.symbol.stock.next(this.stock.SYMBOL)
  }

}
