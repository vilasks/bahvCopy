import { Component, Input, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DataServiceService } from 'src/app/services/data-services/data-service.service';

@Component({
  selector: 'app-charting-block',
  templateUrl: './charting-block.component.html',
  styleUrls: ['./charting-block.component.css']
})
export class ChartingBlockComponent implements OnInit {

  constructor(private router:Router,private dataService:DataServiceService) { }
  @Input() stock!:string|null;
  data:any;
  indexes = ["Nifty 50","Nifty IT","Nifty Bank","Nifty Realty","Nifty Infra","Nifty Energy","Nifty FMCG","Nifty MNC","Nifty Pharma","Nifty PSE","Nifty PSU Bank","India Vix","Nifty Auto","Nifty Metal","Nifty Media"]
  indexes_data:any = []
  ngOnInit(): void {
    if(!this.stock){
      this.getHighlights()
    }
  }

  getHighlights(){
    this.dataService.getHighlights().subscribe(
      (data:any)=>{
        if(data.status==1){
          this.data = data.data;
          this.getIndex()
        }
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  getIndex(){
    this.indexes_data = this.data.INDEXES.filter((ele:any)=>{
      for(let i=0;i<this.indexes.length;i++){
        if(ele.INDEX==this.indexes[i]){
          return true
        }
      }
      return false
    })

    console.log(this.indexes_data)
  }

}
