import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SymbolsService } from 'src/app/services/symbols-services/symbols.service';
import { DOCUMENT } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private symbolService:SymbolsService,
    @Inject(DOCUMENT) private document:Document,
    private toastr:ToastrService
    ) { }
  
  searchBox = new FormControl('',[Validators.pattern(/^[a-zA-Z0-9 ]*$/)])
  matchedStocks:Array<any> = []
  suggestion = false;
  debounceSearch:any = null;

  ngOnInit(): void {

    this.document.addEventListener("click",(e)=>{
      if(this.document.getElementById("results")?.contains((e.target)as Node) || (e.target as any).id === "search"){
        
      }else{
        this.suggestion = false
      }
    })

    this.searchBox.valueChanges.subscribe(
      (data:string|null)=>{
        if(typeof data === "string"){
          if(this.debounceSearch){
            clearTimeout(this.debounceSearch)
            this.debounceSearch = setTimeout(()=>{
              this.handleSearch(data)
            },500)
          }else{
            this.debounceSearch = setTimeout(()=>{
              this.handleSearch(data)
            },500)
          }
        }

        if(!data){
          this.matchedStocks = []
        }
      }
    )

  }

  handleSearch(str:string){
    this.symbolService.searchSymbols(str).subscribe(
      (data:any)=>{
        if(data.status === 1){
          this.matchedStocks = data.data
        }else{
          this.toastr.error(data.msg,"Error")
        }
      },
      (err)=>{
        this.toastr.error(err.error.msg,"Error")
      }
    )
  }

  toggleResult(action:boolean){
    this.searchBox.patchValue("");
    this.suggestion = action;
  }



}
