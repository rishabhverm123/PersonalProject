import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';
import { TrendingService } from 'src/app/services/trending.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{
  constructor(private service_trending:TrendingService,private service_shared:SharedService){}

  ngOnInit(): void {
    this.data_receiver();
    this.getMovies();
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
          this.getMovies();
       
        }
        if(result.type=='set_genres'){
            this.selectedGenres=result.data.genres.join(',');
            
            if(this.page!=0){
              this.page=0;
              this.service_shared.reset_page();
            }
            else{
              this.getMovies();
            }
            
            // this.page=0;
            // 
        }
        
      }
    )
    this.subscriptions.push(subscribe);
  }

  public page=0;

  public MoviesData=[];

  public TotalData=0;

  public TotalPages=0;

  selectedGenres:any='';


  getMovies(){
      let subscribe=this.service_trending.getMovies(this.page+1,this.selectedGenres).subscribe(
        (res:any)=>{
          subscribe.unsubscribe();
          this.MoviesData=res.results;
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
