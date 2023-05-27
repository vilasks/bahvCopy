import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SymbolsService } from 'src/app/services/symbols-services/symbols.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private symbolService:SymbolsService) { }
  
  searchBox = new FormControl('',[Validators.pattern(/^[a-zA-Z0-9 ]*$/)])
  matchedStocks:Array<any> = []
  suggestion = false;

  ngOnInit(): void {
    this.searchBox.valueChanges.subscribe(
      (data:string|null)=>{
        if(typeof data === "string"){
          this.handleSearch(data)
        }

        if(!data){
          this.matchedStocks = []
        }
      }
    )
  }

  handleSearch(str:string){
    this.symbolService.Symbols.subscribe(
      (data:any)=>{
        this.matchedStocks = data.filter((ele:any)=>{
          return new RegExp(`^\\b${str}`,"i").test(ele.SYMBOL) || new RegExp(`^\\b${str}`,"i").test(ele.NAME_OF_COMPANY)
        }).slice(0,10)
      }
    )
  }

  toggleResult(action:boolean){
    this.searchBox.patchValue("");
    this.suggestion = action;
  }

}
