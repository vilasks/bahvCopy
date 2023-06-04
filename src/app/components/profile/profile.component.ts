import { Component, Inject, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { DOCUMENT } from '@angular/common'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  visible = false;
  constructor(
    private router:Router,
    @Inject(DOCUMENT) private document:Document
    ) { }
  ngOnInit(): void {
    this.document.addEventListener("click",(e)=>{
      if((e.target as any).id !== null){
        if((e?.target as any).id !== "profile-btn"){
          this.visible = false
        }
      }
    })
  }

  toggleVisiblity(){
    this.visible = !this.visible
  }

  logout(){
    let confirmation = confirm("Press ok to Logout")
    if(!confirmation){
      return
    }
    document.cookie = "token=''"
    this.router.navigateByUrl("/signin")
  }

}
