import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { 
  debounceTime, 
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl: string   = 'https://api.cdnjs.com/libraries';
  queryUrl: string  = '?search='; 

  constructor(private http: Http) { }

  search(terms: Observable<string>) {
    return terms
      .pipe(debounceTime(400))
      .pipe(distinctUntilChanged())
      .pipe(switchMap(term => this.searchEntries(term)))
  }

  searchEntries(term) {
    return this.http.get(this.baseUrl + this.queryUrl + term)
      .pipe(map(res => res.json()));
  }

}
