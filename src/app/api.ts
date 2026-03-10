import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient){}

  public getData<T>(url: string, params?: any) {
    return this.http.get<T>(url, { params });
  }
}
