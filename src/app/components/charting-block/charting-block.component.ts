import { Component, Input, OnInit } from '@angular/core';
import { Router} from '@angular/router'
@Component({
  selector: 'app-charting-block',
  templateUrl: './charting-block.component.html',
  styleUrls: ['./charting-block.component.css']
})
export class ChartingBlockComponent implements OnInit {

  constructor(private router:Router) { }
  @Input() stock!:string|null; 
  ngOnInit(): void {
    
  }

}
