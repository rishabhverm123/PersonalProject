import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrendingService } from 'src/app/services/trending.service';
import { img_300, unavailable } from 'src/constant';

@Component({
  selector: 'app-modal-content-card',
  templateUrl: './modal-content-card.component.html',
  styleUrls: ['./modal-content-card.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ModalContentCardComponent implements OnInit {
  constructor(private service_trending:TrendingService){}


  movie:any=null;

  public img_300=img_300;

  public no_img=unavailable;

  public video_url=null;

  ngOnInit(): void {
    this.getVideo();
  }

  ngOnDestroy() {
    this.disposeAllSubscriptions();
    
  }

  subscriptions: Subscription[] = [];

  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getYear(date:string){
    return (date).substring(0,4)
  }

  getVideo(){
    let subscribe=this.service_trending.fetchVideo(this.movie.id,this.movie.media_type).subscribe(
      (res:any)=>{
        subscribe.unsubscribe();

       this.video_url= res.results[0]?.key;

      },
      (error:any)=>{
        subscribe.unsubscribe();
      }
    )

    this.subscriptions.push(subscribe);
}

watch(){
  window.open(`https://www.youtube.com/watch?v=${this.video_url}`,'_blank')
}

}
