import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { Hero } from '../../model/Ihero.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroSearchService {

  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  searchHeroesByName(name: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiUrl}/api/all.json`).pipe(
      map((heroes: Hero[]) => heroes.filter(hero => hero.name.toLowerCase().includes(name.toLowerCase())))
    );
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }


  
}
