import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  url = `${environment.apiUrl}/auth`

  signUp(data:any){
    return this.http.post(`${this.url}/signup`,data,{
      headers:{
        "content-type": "application/json"
      }
    })
  }

  signIn(data:any){
    return this.http.post(`${this.url}/signin`,data,{
      headers: {
        "content-type": "application/json"
      }
    })
  }


  getOtp(data:any){
    return this.http.post(`${this.url}/get-otp`,data,{
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  verifyOtp(data:any){
    return this.http.post(`${this.url}/verify-otp`,data,{
      headers: {
        'content-type': 'application/json'
      }
    })
  }

}
