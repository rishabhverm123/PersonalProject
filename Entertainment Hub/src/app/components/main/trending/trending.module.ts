import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingRoutingModule } from './trending-routing.module';
import { TrendingComponent } from './trending.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TrendingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TrendingRoutingModule
  ]
})
export class TrendingModule { }
