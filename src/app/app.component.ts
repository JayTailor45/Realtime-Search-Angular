import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent {
  result = [];
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
      .subscribe( res => {
        this.result = res.results;
        console.log(this.result)
      }); 
  }
}
