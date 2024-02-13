import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCardComponent } from './content-card/content-card.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { GenresComponent } from './genres/genres.component';
import { NgbModalModule, NgbModule, NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentCardComponent } from './modal-content-card/modal-content-card.component';
@NgModule({
  declarations: [ContentCardComponent, PaginatorComponent, GenresComponent, ModalContentCardComponent],
  imports: [
    CommonModule,
    PaginatorModule,
    BadgeModule,
    NgbModule,
    NgbTooltipModule,
    NgbModalModule 
  ],
  
  exports:[ContentCardComponent,PaginatorComponent,GenresComponent],

})
export class SharedModule { }
