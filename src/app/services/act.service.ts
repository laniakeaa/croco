import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class crocSlots {

  constructor(private http: HttpClient) { }

  public slotCategories(object: any): Observable<any> {
    return this.http.get(`${API}/v2/slot/categories?include=games`, { params: object });
  }

  public providers(object: any): Observable<any> {
    return this.http.get(`${API}?type=slot&platform=desktop`, { params: object });
  }

  public providerId(object: any, urlPart?: string): Observable<any> {
    return this.http.get(`${API}/v2/slot/providers${urlPart}`, { params: object });
  }

}
