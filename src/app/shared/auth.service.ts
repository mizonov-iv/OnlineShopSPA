import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  environment: any;

  constructor(private http: HttpClient) { }

  login (user: any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap<any>(this.setToken)
    )
  }

  private setToken(response: { expiresIn: string | number; idToken: string; }) {
    if (response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fbTokenExp', expData.toString())
      localStorage.setItem('fbToken', response.idToken)  
    } else {
      localStorage.clear()
    }
  }

  get token () {
    const expDate = new Date(localStorage.getItem('fbTokenExp')!)
    if (new Date > expDate) {
      this.logout()
      return null
    } else {
      return localStorage.getItem('fbToken')
    }
  }

  logout() {
    this.setToken(null!)
  }

  isAuthenticated() {
    return !!this.token
  }
}
