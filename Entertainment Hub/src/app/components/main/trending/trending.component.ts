import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrendingService } from 'src/app/services/trending.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  constructor(private service_trending:TrendingService){}

  ngOnInit(): void {
      this.getTrendings();
  }

  ngOnDestroy() {
    this.disposeAllSubscriptions();
  }

  subscriptions: Subscription[] = [];

  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public page=1;

  public trendingData=[];


  getTrendings(){
      let subscribe=this.service_trending.getTrending(this.page).subscribe(
        (res:any)=>{
          subscribe.unsubscribe();
          this.trendingData=res.results;
        },
        (error:any)=>{
          subscribe.unsubscribe();
        }
      )

      this.subscriptions.push(subscribe);
  }
}
