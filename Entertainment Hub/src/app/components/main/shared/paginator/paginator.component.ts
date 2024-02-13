import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  constructor(public service_shared:SharedService){}
  first: number = 0;

  rows: number = 20;

  totalRecord=0;

  TotalPages=10;
  @ViewChild('p', {static: false}) paginator: any;

  @Input('child_data') set child_data({totalRecord,callSource}:any) {
    //debugger;
      if(callSource=='Trending'){
        this.totalRecord=totalRecord/10;
      }
      else{
        this.totalRecord=totalRecord;
      }
   
  }
  ngOnInit(): void {
    this.data_receiver();
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
        if(result.type=='reset_page'){
          this.first=0;    
          this.rows=20;
          this.paginator.changePageToFirst();
   
        }
      }
    )
    this.subscriptions.push(subscribe);
  }

  onPageChange(event: any) {
      debugger;
      this.service_shared.change_page(event.page)
  }
}
