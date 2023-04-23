import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  date = new FormControl(this.formatDate(new Date()))
  months:Array<Date> = []
  showMonths = false;
  ngOnInit(): void {
    this.getData()
    this.generateMonths()
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.symbol = changes['symbol'].currentValue
      this.getData()
  }

  getData(){
    let date = new Date(this.date?.value as any).toLocaleDateString()
    this.dataService.getCalenderData(date,this.symbol).subscribe(
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

  async formatData(data:any){
    this.data =  await Promise.all(data.map((ele:any)=>{
      ele.CHANGE = ele.CLOSE - ele.PREVCLOSE
      ele.CHANGEPERCENT = ((ele.CLOSE - ele.PREVCLOSE)/ele.PREVCLOSE)*100
      return ele 
    }))
    this.generateDates()
  }

  getDay(str:string){
    let date = new Date(str)
    return (date.getDay() + 1).toString()
  }

  getDate(str:string){
    let date = new Date(str)
    return date.getDate()
  }

  formatDate(str:any){
    let data = new Date(str).toISOString().split("T")
    return data[0]
  }

  generateDates(){
    let data = []
    let month = new Date(this.date?.value as any).getMonth()
    let date = new Date(this.date?.value as any)
    date.setDate(1)
    for(let i=1;month == date.getMonth();i++){
      let tmp = this.data.filter((ele:any)=> new Date(ele.TIMESTAMP).toLocaleDateString() == new Date(date).toLocaleDateString())
      if(tmp.length > 0){
        data.push(tmp[0])
      }else{
        data.push({TIMESTAMP: new Date(date)})
      }
      date.setDate(date.getDate()+1)
    }
    this.data = data
    console.log(data)
  }

  generateMonths(){
    let year = new Date(this.date.value as string).getFullYear()
    let date = new Date(this.date.value as string)
    date.setMonth(0)
    date.setDate(1)
    let months = []
    for(let i = 1; year == date.getFullYear();i++){
      months.push(new Date(date))
      date.setMonth(date.getMonth()+1)
    }
    this.months = months
    console.log(this.months)
  }

  getMonth(){

  }

  prevYear(){
    let date = new Date(this.date.value as string)
    date.setFullYear(date.getFullYear()-1)
    this.date.patchValue(this.formatDate(date))
    this.generateMonths()
  }

  nextYear(){
    let date = new Date(this.date.value as string)
    date.setFullYear(date.getFullYear()+1)
    this.date.patchValue(this.formatDate(date))
    this.generateMonths()
  }

  showHideMonths(){
    this.showMonths = !this.showMonths
  }

  setMonth(str:Date){
    this.date.patchValue(this.formatDate(str))
    this.getData()
    this.showMonths = false;
  }

}
