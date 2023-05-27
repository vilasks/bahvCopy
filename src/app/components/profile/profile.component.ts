import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  visible = false;
  constructor(private router:Router) { }
  ngOnInit(): void {
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
    this.router.navigateByUrl("/login")
  }

}
