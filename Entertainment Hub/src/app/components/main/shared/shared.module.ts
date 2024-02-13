import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCardComponent } from './content-card/content-card.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { GenresComponent } from './genres/genres.component';
import { NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [ContentCardComponent, PaginatorComponent, GenresComponent],
  imports: [
    CommonModule,
    PaginatorModule,
    BadgeModule,
    NgbTooltipModule
  ],
  exports:[ContentCardComponent,PaginatorComponent,GenresComponent]
})
export class SharedModule { }
