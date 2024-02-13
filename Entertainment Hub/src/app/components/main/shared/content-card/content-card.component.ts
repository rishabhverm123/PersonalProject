import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/shared-service.service';
import { TrendingService } from 'src/app/services/trending.service';
import { img_300, unavailable } from 'src/constant';
import { ModalContentCardComponent } from '../modal-content-card/modal-content-card.component';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent implements OnInit {

  constructor(private service_shared:SharedService,private service_modal:NgbModal){}

  public img_300=img_300;

  public no_img=unavailable;

  public movie:any=null;

  @Input('child_data') set child_data({movie}:any) {
    //debugger;
      this.movie=movie;
  }

  open_modal(movie:any){
    this.service_shared.modal_instance = this.service_modal.open(
      ModalContentCardComponent, { windowClass: "modal-75",
    });

    this.service_shared.modal_instance.componentInstance.movie=movie;
  }

  ngOnInit(): void {
      
  }

}
