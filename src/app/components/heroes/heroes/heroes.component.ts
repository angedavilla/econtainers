import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/Ihero.model';
import { HeroesServiceService } from '../../../services/heroes/heroes-service.service';
import { HeroSearchService } from 'src/app/services/hero-search/hero-search.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { HeroImages } from 'src/app/model/Ihero-images';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass'],
})
export class HeroesComponent implements OnInit {
  
  public heroes: Hero[] = [];
  public searchResults: Hero[] = [];
  private searchName: string = '';
  private searchTermSubscription!: Subscription;
  private heroesKey = makeStateKey<Hero[]>('heroes');

  constructor(private heroesServiceService: HeroesServiceService
    ,private heroSearchService: HeroSearchService
    ,private router: Router
    ,private transferState: TransferState
  ) { }

  ngOnInit(): void {
    this.getHeroes();

    this.searchTermSubscription = this.heroSearchService.getSearchTerm().subscribe((searchTerm) => {
      this.searchName = searchTerm;
      this.searchHeroes();
    });
  }

  getImageUrl(hero: Hero): string {
    const screenSize = this.getScreenSize();
    if (screenSize === 'lg' || screenSize === 'md' || screenSize === 'sm' || screenSize === 'xs') {
      return hero.images[screenSize];
    } else {
      return 'https://oyster.ignimgs.com/wordpress/stg.ign.com/2020/12/the-evolution-of-iron-man-in-the-mcu.jpg';
    }
  }
  getScreenSize(): string {
    if (window.innerWidth >= 1200) {
      return 'lg';
    } else if (window.innerWidth >= 768) {
      return 'md';
    } else if (window.innerWidth >= 576) {
      return 'sm';
    } else {
      return 'xs';
    }
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }

  searchHeroes(): void {
    if (this.searchName.trim()) {
      this.heroSearchService.searchHeroesByName(this.searchName.trim()).subscribe((heroes) => {
        this.heroes = heroes;
      });
    } else {
      this.getHeroes();
    }
  }

  getHeroes(): void {
    const cachedHeroes = this.transferState.get<Hero[]>(this.heroesKey, []);
    if (cachedHeroes.length > 0) {
      this.heroes = cachedHeroes;
    } else {
      this.heroesServiceService.getRandomHeroes().subscribe((heroes) => {
        this.heroes = heroes;
        this.transferState.set(this.heroesKey, heroes);
      });
    }
  }

  redirectToHeroDetail(heroId: number): void {
    this.router.navigate(['/hero', heroId]);
  }

}
