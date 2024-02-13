import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';
import { TrendingService } from 'src/app/services/trending.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private service_trending:TrendingService,private service_shared:SharedService){}
  ngOnInit(): void {
    this.getSearching();
    this.data_receiver();
  }

  ngOnDestroy() {
    this.disposeAllSubscriptions();
    
  }

  data_receiver(){
    let subscribe=this.service_shared.data_receiver().subscribe(
      (result:any)=>{
        if(result.type=='change_page'){
          this.service_shared.scroll_to_element('container_top')
          this.page=result.data.page;
          this.getSearching();
       
        }
      }
    )
    this.subscriptions.push(subscribe);
  }

  subscriptions: Subscription[] = [];

  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  selectedTab:any='movie';

  select_tab(type:any){
    this.selectedTab=type;
    if(this.page!=0){
      this.page=0;
      this.service_shared.reset_page();
    }
    else{
      this.getSearching();
    }
   
  }

  public page=0;

  public searchData=[];

  public TotalData=0;

  public TotalPages=0;

  public searchedText:string='';

  getSearching(){
      let subscribe=this.service_trending.fetchSearch(this.page+1,this.selectedTab,this.searchedText).subscribe(
        (res:any)=>{
          subscribe.unsubscribe();
          this.searchData=res.results;
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
