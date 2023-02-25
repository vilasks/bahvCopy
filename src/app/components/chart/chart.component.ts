import { Component, OnInit,Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Chart,ChartType } from 'chart.js/auto'
import { DataServiceService } from 'src/app/services/data-services/data-service.service';
import { SymbolsService } from 'src/app/services/symbols-services/symbols.service';
import { min,max} from 'lodash'
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private dataService:DataServiceService,private symbolService:SymbolsService) { }
  @Input() symbol!:string
  data:Array<number> = [1,2,3,4,5,6,7]
  label:Array<string> = ["a","b","c","d","e","f","g"]
  chart:any;
  staticLabel:string = "Static Label"
  options:any;
  type:ChartType = "line"
  currentInterval:number = 7;
  currentevent:any = null;
  ngOnInit(): void {
    this.chart = new Chart(
      "chart",
      {
        data: {
          labels: this.label,
          datasets: [
            {
              data:this.data,
              type: this.type,
              label: this.staticLabel,
              // pointStyle: "line",
              pointRadius: 0
            }
          ]
        },
        options:{
          // responsive: true,
          interaction:{
            intersect: false,
            mode: "index",
          },
          scales:{
            y:{
              suggestedMin:300,
              suggestedMax: 340,
            }
          }
        },
      }
    )

    this.getDate()

    this.symbolService.stock.subscribe(
      (data:string)=>{
        this.getDate(data)
      }
    )

  }
  
  getDate(symbol=this.symbol){
    this.dataService.getDate(symbol).subscribe(
      (data:any)=>{
        this.data = data.data
        this.updateChart(data)
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }

  changeStyle(type:ChartType){
    if(type=="scatter"){
      this.chart.data.datasets[0].pointRadius = 5
    }else{
      this.chart.data.datasets[0].pointRadius = 0
    }
    this.chart.data.datasets[0].type = type
    this.chart.update()    
  }

  changeIntervel(intervel:string){
    let i = parseInt(intervel)
    this.dataService.changeInterval(this.symbol,i).subscribe(
      (data:any)=>{
        this.updateChart(data)
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  updateChart(data:any){
    let priceArr = data.data.map((e:any)=>{
      return e.CLOSE
    })

    let dates = data.data.map((e:any)=>{
      return new Date(e.TIMESTAMP).toDateString()
    })

    this.chart.data.datasets[0].data = priceArr
    this.chart.data.labels = dates 
    this.chart.options.scales.y.min = (min(priceArr) as number) - 10
    this.chart.options.scales.y.max = (max(priceArr) as number) + 10
    this.chart.update()
  }

  wheelEvent(e:any){
    if(e.deltaY>0){
      this.currentInterval+=7
      if(this.currentevent){
        clearInterval(this.currentevent)
        this.currentevent = setTimeout(()=>this.changeIntervel(this.currentInterval.toString()),2000)
      }else{
        this.currentevent = setTimeout(()=>this.changeIntervel(this.currentInterval.toString()),2000)
      }
    }else{
      this.currentInterval-=7
      if(this.currentevent){
        clearInterval(this.currentevent)
        this.currentevent = setTimeout(()=>this.changeIntervel(this.currentInterval.toString()),2000)
      }else{
        this.currentevent = setTimeout(()=>this.changeIntervel(this.currentInterval.toString()),2000)
      }
    }
    e.preventDefault()
  }

}
