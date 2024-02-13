import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, SECRET_API_KEY } from 'src/constant';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(private http:HttpClient) { 



  }
  getTrending(page:any): Observable<any> {
    return this.http.get<any>(`${API_URL}/trending/all/day?api_key=${SECRET_API_KEY}&page=${page}`);
  }

  getMovies(page:any,genreforURL:any): Observable<any> {
    return this.http.get<any>(`${API_URL}/discover/movie?api_key=${SECRET_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
  }
  getSeries(page:any,genreforURL:any): Observable<any> {
    return this.http.get<any>(`${API_URL}/discover/tv?api_key=${SECRET_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
  }
  getGenres(type:any): Observable<any> {
    return this.http.get<any>(`${API_URL}/genre/${type}/list?api_key=${SECRET_API_KEY}&language=en-US`);
  }

  fetchSearch(page:any,type:any,searchText:any): Observable<any> {
    return this.http.get<any>(`${API_URL}/search/${type}?api_key=${SECRET_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
  }
}
