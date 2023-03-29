import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import {ActivatedRoute } from '@angular/router'
import { DataServiceService } from 'src/app/services/data-services/data-service.service';

@Component({
  selector: 'app-heat-calender',
  templateUrl: './heat-calender.component.html',
  styleUrls: ['./heat-calender.component.css']
})
export class HeatCalenderComponent implements OnInit, OnChanges {

  constructor(private url:ActivatedRoute,private dataService:DataServiceService) { }
  @Input() symbol:string='';
  i:number = 1
  data:any;
  ngOnInit(): void {
    // this.url.params.forEach((val:any)=>{
    //     if(this.symbol){
    //       if(val.data){
    //         this.symbol = val.data
    //       }
    //     }
    // })
    this.getData()
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.symbol = changes['symbol'].currentValue
      this.getData()
  }

  getData(){
    this.dataService.changeInterval(this.symbol,this.i*30).subscribe(
      (data:any)=>{
        if(data.status==1){
          this.formatData(data.data)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  formatData(data:any){
    this.data =  data.map((ele:any)=>{
      ele.CHANGE = ele.CLOSE - ele.PREVCLOSE
      ele.CHANGEPERCENT = ((ele.CLOSE - ele.PREVCLOSE)/ele.PREVCLOSE)*100
      return ele 
    })
  }



}
