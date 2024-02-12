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
}
