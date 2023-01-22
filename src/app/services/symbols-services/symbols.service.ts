import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Subject,BehaviorSubject,Observable } from 'rxjs';
import {OnInit} from '@angular/core'
@Injectable({
  providedIn: 'root'
})
export class SymbolsService{

  Symbols:BehaviorSubject<any> = new BehaviorSubject<any>([])
  stock:Subject<string> = new Subject<string>()
  constructor(private http:HttpClient) { 
    this.getSymbols()
  }
  
  getSymbols(){
    return this.http.get(`${environment.apiUrl}/get-symbols`,{
      headers:{
        "content-type": "application/json"
      }
    }).subscribe(
      (data:any)=>{
        this.Symbols.next(data.data)
      }
    )
  }
}
