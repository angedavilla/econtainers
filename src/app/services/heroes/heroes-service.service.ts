import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Hero } from '../../model/Ihero.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesServiceService {

  apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }


  getRandomHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiUrl}/api/all.json`).pipe(
      map((heroes: Hero[]) => {
        for (let i = heroes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [heroes[i], heroes[j]] = [heroes[j], heroes[i]];
        }
        return heroes.slice(0, 20);
      })
    );
  }

  
}
