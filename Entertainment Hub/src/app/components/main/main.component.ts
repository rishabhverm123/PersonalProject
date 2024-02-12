import { Component, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    constructor(private service_shared:SharedService,private router:Router){
      this.change_route_detection();
    }
    ngOnInit(): void {
        
    }

    ngOnDestroy() {
      this.disposeAllSubscriptions();
    }
  
    subscriptions: Subscription[] = [];
  
    disposeAllSubscriptions() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    change_route_detection() {
      let route_subscription = this.router.events.subscribe((event:any) => {
    
         if(event instanceof NavigationEnd){
           
          const url=event.url;
          let route=''
          if(url.includes('series')){
            route='series';
          }
          else if(url.includes('movies')){
            route='movies';

          }
          else if(url.includes('search')){
            route='search';
            
          }
          else{
            route=''
          }

          this.service_shared.data_sender('route_change',{current_route:route});
         }
     
       });
        this.subscriptions.push(route_subscription);
     }
}
