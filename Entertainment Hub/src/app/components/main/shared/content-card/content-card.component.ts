import { Component, Input, OnInit } from '@angular/core';
import { TrendingService } from 'src/app/services/trending.service';
import { img_300, unavailable } from 'src/constant';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent implements OnInit {

  constructor(private service_trending:TrendingService){}

  public img_300=img_300;

  public no_img=unavailable;

  public movie:any=null;

  @Input('child_data') set child_data({movie}:any) {
    //debugger;
      this.movie=movie;
  }

  ngOnInit(): void {
      
  }

}
