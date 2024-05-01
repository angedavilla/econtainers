import { Component, OnInit } from '@angular/core';
import { HeroSearchService } from 'src/app/services/hero-search/hero-search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  searchName: string = ''

  constructor(private heroSearchService: HeroSearchService) { }

  ngOnInit(): void {

  }

  updateSearchTerm(): void {
    this.heroSearchService.setSearchTerm(this.searchName.trim());
  }

}
