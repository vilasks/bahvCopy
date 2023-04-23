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


  changeInterval(symbol:string,i:number){
    return this.http.get(
      `${environment.apiUrl}/get-data/${symbol}?i=${i}`,
      {
        headers:{
          "content-type": "application/json"
        }
      }
    )
  }

  getbites(symbol:string){
    return this.http.get(
      `${environment.apiUrl}/bites?symbol=${symbol}`,
      {
        headers:{
          'content-type': "application/json"
        }
      }
    )
  }

  getHighlights(){
    return this.http.get(`${environment.apiUrl}/highlights`)
  }

  getCalenderData(date:string,symbol:string){
    return this.http.post(`${environment.apiUrl}/get-calender-data`,{date:date,symbol:symbol},{
      headers:{
        "content-type": "application/json"
      }
    })
  }

}
