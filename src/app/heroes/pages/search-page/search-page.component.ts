import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesServices: HeroesService) { }


  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesServices.getSuggestions()
      .subscribe(heroes => this.heroes = heroes)
  }

  onSelectedOption(event: MatAutocompleteActivatedEvent): void {

    if (!event.option?.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero)
  }


}
