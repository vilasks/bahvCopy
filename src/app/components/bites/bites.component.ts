import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-services/data-service.service';

@Component({
  selector: 'app-bites',
  templateUrl: './bites.component.html',
  styleUrls: ['./bites.component.css']
})
export class BitesComponent implements OnInit,OnChanges {

  constructor(private dataService:DataServiceService) { }
  @Input() symbol!:string
  data:any;
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.getBites(changes["symbol"].currentValue)
      
  }

  getBites(symbol:string){
    this.dataService.getbites(symbol).subscribe(
      (data:any)=>{
        if(data.status==1){
          this.data = data.data
        }
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }

}
