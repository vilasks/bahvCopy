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
  Today:string = new Date().toDateString();
  data:any;
  ngOnInit(): void {
    this.getHighlights()
  }

  getHighlights(){
    this.dataService.getHighlights().subscribe(
      (data:any)=>{
        if(data.status=="00"){
          this.data = data.data;
        }
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
