import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'',
        loadChildren:()=>
          import('./trending/trending.module').then((m)=>m.TrendingModule)
      },
      {
        path:'movies',
        loadChildren:()=>
          import('./movies/movies.module').then((m)=>m.MoviesModule)
      },
      {
        path:'series',
        loadChildren:()=>
          import('./tv/tv.module').then((m)=>m.TvModule)
      },
      {
        path:'search',
        loadChildren:()=>
          import('./search/search.module').then((m)=>m.SearchModule)
      }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
