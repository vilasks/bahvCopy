import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-high-low-cards',
  templateUrl: './high-low-cards.component.html',
  styleUrls: ['./high-low-cards.component.css']
})
export class HighLowCardsComponent implements OnInit {

  constructor() { }
  @Input() data:any;
  ngOnInit(): void {
  }

}
