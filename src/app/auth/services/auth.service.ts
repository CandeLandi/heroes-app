import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { RegisterPayload } from '../interfaces/register-payload';
import { CheckTokenResponse } from '../interfaces/check-token.response';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {
    this.checkAuthStatus().subscribe();
  }

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  private _currentUser = signal<User | null>(null);

  // Al exterior (cualquier cosa que esté fuera del servicio)
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  get __currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))
      );
  }

  register(user: User): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<RegisterPayload>(url, user)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(error => {
          console.error('Error registering user:', error);
          return of(false);
        })
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
