import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Hero } from '../../model/Ihero.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroDetailService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  searchHeroById(id: number): Observable<Hero | null> {
    return this.http.get<Hero>(`${this.apiUrl}/api/id/${id}.json`).pipe(
      map((hero: Hero) => hero || null)
    );
  }

}
