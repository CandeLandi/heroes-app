import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero;


  constructor() { }

  ngOnInit(): void {
    console.log(this.hero)
    if (!this.hero) throw new Error('Hero is required');
  }


/*
  deleteHeroById(id: string): void {

    this.heroesService.deleteHeroById(id)
  } */

}
