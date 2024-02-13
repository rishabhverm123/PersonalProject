import { Component, Input } from '@angular/core';
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
export class PaginatorComponent {

  constructor(public service_shared:SharedService){}
  first: number = 0;

  rows: number = 20;

  totalRecord=0;

  TotalPages=10;

  @Input('child_data') set child_data({totalRecord,callSource}:any) {
    //debugger;
      if(callSource=='Trending'){
        this.totalRecord=totalRecord/10;
      }
      else{
        this.totalRecord=totalRecord;
      }
   
  }

  onPageChange(event: any) {
      debugger;
      this.service_shared.change_page(event.page)
  }
}
