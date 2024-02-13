import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';
import { TrendingService } from 'src/app/services/trending.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit{
  constructor(private service_trending:TrendingService,private service_shared:SharedService){}

  ngOnInit(): void {
    this.data_receiver();
    this.getSeries();
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
          this.getSeries();
       
        }
        if(result.type=='set_genres'){
            this.selectedGenres=result.data.genres.join(',');
            this.getSeries();
        }
        
      }
    )
    this.subscriptions.push(subscribe);
  }

  public page=0;

  public TVData=[];

  public TotalData=0;

  public TotalPages=0;

  selectedGenres:any='';


  getSeries(){
      let subscribe=this.service_trending.getSeries(this.page+1,this.selectedGenres).subscribe(
        (res:any)=>{
          subscribe.unsubscribe();
          this.TVData=res.results;
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
