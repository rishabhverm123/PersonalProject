import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedService } from './services/shared-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrendingService } from './services/trending.service';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [SharedService,TrendingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
