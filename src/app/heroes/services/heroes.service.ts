import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
      .pipe(
        catchError(error => {
          console.error('Error fetching heroes:', error);
          return of([]);
        })
      );
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)

      .pipe(
        catchError(error => {
          console.error('Error fetching hero by id:', error);
          return of(undefined);
        })
      );
  }

  getSuggestions(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
      .pipe(
        catchError(error => {
          console.error('Error fetching suggestions:', error);
          return of([]);
        })
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero)
      .pipe(
        catchError(error => {
          console.error('Error creando el héroe:', error);
          return throwError(error);
        })
      );
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero._id) return throwError(() => new Error('Hero id is required'));
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero._id}`, hero)
      .pipe(
        catchError(error => {
          console.error('Error actualizando el héroe:', error);
          return throwError(error);
        })
      );
  }


  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(resp => true),
        catchError(error => {
          console.error('Error deleting hero:', error);
          return of(false);
        })
      );
  }
}
