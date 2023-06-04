import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from 'src/app/services/data-services/data-service.service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  alertsList:any = null;
  userDetails:any = null;
  preference:any = null;
  alertError = false;
  currentItem = 'personal-info'
  noAlerts = false;
  newsletter = new FormControl(this.preference);
  constructor(
    private dataService:DataServiceService,
    private toastr:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  listAlerts(){
    if(this.alertsList){
      return
    }
    this.dataService.getUserAlerts().subscribe(
      (data:any)=>{
        if(data.status === 1){
          this.alertsList = data.data
          this.alertError = false;
          if(data.data.length < 1){
            this.noAlerts = true;
          }else{
            this.noAlerts = false;
          }
        }else{
          this.alertError = true 
        }
      },
      (err)=>{
        this.alertError = true
      }
    )
  }

  setCurrentItem(item:string){
    this.currentItem = item
    if(this.currentItem == "email-settings"){
      this.getPreference()
    }else if(this.currentItem == "price-alerts"){
      this.listAlerts()
    }else if(this.currentItem == "personal-info"){
      this.getUserDetails()
    }
  }


  getUserDetails(){
    if(this.userDetails){
      return
    }
    this.dataService.getUserDetails().subscribe(
      (data:any)=>{
        if(data.status === 1){
          this.userDetails = data.data
        }else{
          this.toastr.error(data.msg, "Error")
        }
      },
      (err)=>{
        this.toastr.error(err.error.msg, "Error")
      }
    )
  }

  getPreference(){
    if(this.preference != null){
      return
    }
    this.dataService.updatePreference("get").subscribe(
      (data:any)=>{
        if(data.status === 1){
          this.preference = data.newsletter
          this.newsletter.patchValue(data.newsletter)
        }else{
          this.toastr.error(data.msg, "Error")
        }
      },
      (err)=>{
        this.toastr.error(err.error.msg, "Error")
      }
    )
  }

  setPreference(){
    this.dataService.updatePreference("update").subscribe(
      (data:any)=>{
        if(data.status === 1){
          this.preference = data.newsletter
          this.newsletter.patchValue(data.newsletter)
        }else{
          this.toastr.error(data.msg, "Error")
        }
      },
      (err)=>{
        this.toastr.error(err.error.msg, "Error")
      }
    )
  }

  deletePriceAlert(_id:string){
    this.dataService.deletePriceAlert(_id).subscribe(
      (data:any)=>{
        if(data.status === 1){
          this.toastr.success(data.msg,"Success")
          this.alertsList = null 
          this.listAlerts()
        }else{
          this.toastr.error(data.msg, "Error")
        }
      },
      (err)=>{
        this.toastr.error(err.error.msg, "Error")
      }
    )
  }

  deleteAccount(){
    let confirmation = confirm("you will lost all your data. press ok to confirm")
    if(!confirmation){
      return
    }
    this.dataService.deleteAccount().subscribe(
      (data:any)=>{
        if(data.status === 1){
          document.cookie = "token=''"
          this.router.navigateByUrl("/signup")
        }else{
          this.toastr.error(data.msg, "Error")
        }
      },
      (err)=>{
        this.toastr.error(err.error.msg, "Error")
      }
    )
  }

}
