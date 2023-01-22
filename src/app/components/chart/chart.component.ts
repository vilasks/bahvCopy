import { Component, OnInit,Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Chart,ChartType } from 'chart.js/auto'
import { DataServiceService } from 'src/app/services/data-services/data-service.service';
import { SymbolsService } from 'src/app/services/symbols-services/symbols.service';

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
            }
          ]
        },
        options:{
          // responsive: true,
          scales:{
            y:{
              suggestedMin:300,
              suggestedMax: 340,
            }
          }
        }
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
        this.chart.data.datasets[0].data = data.data.map((e:any)=>{
          return e.CLOSE
        })
        this.chart.data.labels = data.data.map((e:any)=>{
          return new Date(e.TIMESTAMP).toDateString()
        })
        this.chart.options.scales.y.min = 0
        this.chart.options.scales.y.max = 100
        this.chart.update()
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }

  changeStyle(type:ChartType){
    this.chart.data.datasets[0].type = type
    this.chart.update()    
  }

}
