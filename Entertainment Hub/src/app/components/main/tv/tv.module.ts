import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TvComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TvRoutingModule
  ]
})
export class TvModule { }
