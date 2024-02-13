import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCardComponent } from './content-card/content-card.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
@NgModule({
  declarations: [ContentCardComponent, PaginatorComponent],
  imports: [
    CommonModule,
    PaginatorModule,
    BadgeModule
  ],
  exports:[ContentCardComponent,PaginatorComponent]
})
export class SharedModule { }
