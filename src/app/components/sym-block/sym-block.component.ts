import { Component, Input, OnInit } from '@angular/core';
import { SymbolsService } from 'src/app/services/symbols-services/symbols.service';
import { Output, EventEmitter} from '@angular/core'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sym-block',
  templateUrl: './sym-block.component.html',
  styleUrls: ['./sym-block.component.css']
})
export class SymBlockComponent implements OnInit {
  @Input() stock!:any
  @Input() type!:any;
  @Output() toggleSuggestions = new EventEmitter<boolean>();
  constructor(
    private symbol:SymbolsService,
    private toastr:ToastrService
    ) { }
  ngOnInit(): void {
  }

  changeStock(){
    this.symbol.stock.next(this.stock.SYMBOL)
    this.toggleSuggestions.emit(false);
  }

  addToWatchList(stock:string){
    this.symbol.addToWatchList(stock).subscribe(
      (data:any)=>{
        if(data.status === 1){
          this.symbol.getSymbols()
        }else{
          this.toastr.error(data.msg,"Error")
        }
      },
      (err)=>{
        this.toastr.error(err.error.msg, "Error")
      }
    )
  }

  removeFromWatchList(stock:string){
    this.symbol.removeFromWatchlist(stock).subscribe(
      (data:any)=>{
        if(data.status === 1){
          this.symbol.getSymbols()
        }else{
          this.toastr.error(data.msg,"Error")
        }
      },
      (err)=>{
        this.toastr.error(err.error.msg, "Error")
      }
    )
  }

}
