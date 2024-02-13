import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTransmitter } from '../models/DataTransmitter';

@Injectable({
  providedIn: 'root'
})
export class SharedService{

  constructor(){
    this.transfterSubject=new Subject<any>();
  }

  

  public transfterSubject:any;

  data_sender(type:any,data:any){
    const dt=new DataTransmitter(type,data)
    return this.dataTransmitter(dt.transmit());
  }

  dataTransmitter(data: any) {
    return this.transfterSubject.next(data);
  }

  data_receiver(){

    return this.transfterSubject.asObservable();
  }

  change_page(page:any){
    this.data_sender('change_page',{page:page})
  }

  set_genres(genres:any){
    this.data_sender('set_genres',{genres:genres})
  }
  scroll_to_element(element:any) {
    //debugger;
    setTimeout(() => {
        const scrollTo = document.querySelector("#" + element);
        if (scrollTo) {
            scrollTo.scrollIntoView({ block: 'start', inline: 'start',behavior: 'smooth'  });
        }
    }, 100);
}

reset_page(){
  this.data_sender('reset_page',null)
}



}
