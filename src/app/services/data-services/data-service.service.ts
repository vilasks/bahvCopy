import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient) { }

  getDate(symbol:string){
    return this.http.get(
      `${environment.apiUrl}/get-data/${symbol}`,
      {
        headers:{
          "content-type": "application/json"
        }
      }
    )
  }

}
