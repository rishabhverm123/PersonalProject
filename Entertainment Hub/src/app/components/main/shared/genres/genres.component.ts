import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';
import { TrendingService } from 'src/app/services/trending.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  constructor(private service_trending:TrendingService,private service_shared:SharedService) {}
  
  ngOnInit(): void {
  
  }

  call_source=null;

  GenresData:any=[];

  selectedGenres:any=[];

  @Input('child_data') set child_data({call_source}:any) {
    //debugger;
      this.call_source=call_source;
      this.getGenres();
  }
  ngOnDestroy() {
    this.disposeAllSubscriptions();
    
  }

  subscriptions: Subscription[] = [];

  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }


  getGenres(){
    let subscribe=this.service_trending.getGenres(this.call_source).subscribe(
      (res:any)=>{
        subscribe.unsubscribe();
        this.GenresData=res.genres;


      },
      (error:any)=>{
        subscribe.unsubscribe();
      }
    )

    this.subscriptions.push(subscribe);
}

selectGenres(genres:any){
  debugger;
  if(this.remove_flag){
    this.remove_flag=false;
    return;
  }
  if(!this.selectedGenres.includes(genres.id)){
    this.selectedGenres.push(genres.id);
  }
  this.service_shared.set_genres(this.selectedGenres);
}
public remove_flag=false;
removeGenres(genres:any){
  debugger;
  this.remove_flag=true;
  if(this.selectedGenres.includes(genres.id)){

    this.selectedGenres=this.selectedGenres.filter((selected:any) => selected !== genres.id)
  }
  this.service_shared.set_genres(this.selectedGenres);
}
}
