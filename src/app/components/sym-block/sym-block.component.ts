import { Component, Input, OnInit } from '@angular/core';
import { SymbolsService } from 'src/app/services/symbols-services/symbols.service';
import { Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'app-sym-block',
  templateUrl: './sym-block.component.html',
  styleUrls: ['./sym-block.component.css']
})
export class SymBlockComponent implements OnInit {
  @Input() stock!:any
  @Output() toggleSuggestions = new EventEmitter<boolean>();
  constructor(private symbol:SymbolsService) { }
  ngOnInit(): void {
  }

  changeStock(){
    this.symbol.stock.next(this.stock.SYMBOL)
    this.toggleSuggestions.emit(false);
  }

}
