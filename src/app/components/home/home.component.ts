import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }
  symbol!:string|null;
  ngOnInit(): void {
    this.router.paramMap.forEach((e)=>{this.symbol = e.get("data")})
  }

}
