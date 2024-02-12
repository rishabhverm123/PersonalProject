import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router,private service_shared:SharedService){}

  ngOnInit(): void {
      this.dataReciever()
  }

  subscriptions : Subscription[]=[];

  dataReciever(){
      let subscribe= this.service_shared.data_receiver().subscribe(
        (result:any)=>{
          debugger;
            if(result.type=='route_change'){
              this.current_route=result.data.current_route;
            }
        }
      )
      this.subscriptions.push(subscribe);
  }

  ngOnDestroy(){
      this.subscriptions.forEach((subscription:any)=>subscription.unsubscribe())
  }

  current_route='';

  selected_route:string='';
  Navigate(route:string){
    debugger;
    this.selected_route=route;
    this.service_shared.data_sender('testing',{action:'alert'})
    // this.router.navigate(['/main/'+route]);
  }
}
