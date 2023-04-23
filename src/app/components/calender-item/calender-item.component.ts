import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-calender-item',
  templateUrl: './calender-item.component.html',
  styleUrls: ['./calender-item.component.css']
})
export class CalenderItemComponent implements OnInit {

  @Input() data:any;
  constructor() { }

  ngOnInit(): void {
  }

  getDay(str:string){
    let date = new Date(str)
    return (date.getDay() + 1).toString()
  }

  getDate(str:string){
    let date = new Date(str)
    return date.getDate()
  }

}
