import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCardComponent } from './content-card/content-card.component';



@NgModule({
  declarations: [ContentCardComponent],
  imports: [
    CommonModule
  ],
  exports:[ContentCardComponent]
})
export class SharedModule { }
