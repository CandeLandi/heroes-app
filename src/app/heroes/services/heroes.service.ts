import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments.prod';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroById( id: string ): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${ id }`)
    .pipe(
      catchError( error => of(undefined))
    )
  }

getSuggestions(): Observable<Hero[]> {
  return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`)
}

}
