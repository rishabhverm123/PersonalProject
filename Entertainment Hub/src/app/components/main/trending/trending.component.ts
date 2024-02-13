import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';
import { TrendingService } from 'src/app/services/trending.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  constructor(private service_trending:TrendingService,private service_shared:SharedService){}

  ngOnInit(): void {
    this.data_receiver();
      this.getTrendings();
  }

  ngOnDestroy() {
    this.disposeAllSubscriptions();
    
  }

  subscriptions: Subscription[] = [];

  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  data_receiver(){
    let subscribe=this.service_shared.data_receiver().subscribe(
      (result:any)=>{
        if(result.type=='change_page'){
          this.service_shared.scroll_to_element('container_top')
          this.page=result.data.page;
          this.getTrendings();
       
        }
      }
    )
    this.subscriptions.push(subscribe);
  }

  public page=0;

  public trendingData=[];

  public TotalData=0;

  public TotalPages=0;


  getTrendings(){
      let subscribe=this.service_trending.getTrending(this.page+1).subscribe(
        (res:any)=>{
          subscribe.unsubscribe();
          this.trendingData=res.results;
          this.TotalData=res.total_results;

          this.TotalPages=res.total_pages;


        },
        (error:any)=>{
          subscribe.unsubscribe();
        }
      )

      this.subscriptions.push(subscribe);
  }
}
