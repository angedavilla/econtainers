import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/model/Ihero.model';
import { HeroDetailService } from '../../../services/hero-detail/hero-detail.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.sass']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero | null = null;

  constructor(private route: ActivatedRoute
    ,private heroDetailService: HeroDetailService
    ,private transferState: TransferState
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const heroId = Number(params.get('id'));
      if (!isNaN(heroId)) {
        const key = makeStateKey<Hero>('hero-' + heroId);
        const heroData = this.transferState.get<Hero | null>(key, null);
        if (heroData) {
          this.hero = heroData;
        } else {
          this.heroDetailService.searchHeroById(heroId).pipe(
            tap(hero => {
              if (hero) {
                this.hero = hero;
                this.transferState.set<Hero>(key, hero);
              }
            })
          ).subscribe();
        }
      }
    });
  }


}
