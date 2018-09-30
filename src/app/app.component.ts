import { Component, OnInit } from '@angular/core';

import { of, Subject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

import { VatService } from './vat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ VatService ]
})
export class AppComponent implements OnInit {

  vatNumber$ = new Subject<string>();
  vatData: any;

  constructor(
    private vatService: VatService
  ) {}

  ngOnInit() {
    const obs$ = this.vatNumber$.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(
        vatString => this.vatService.getVat(vatString)
      ),
      catchError(error => of({ error: error })),
    );
    obs$.subscribe(
      data => {
        // console.log(data)
        this.vatData = data;
      },
      error => console.log(error),
    );
  }

  onKey(vatString: string) {
    this.vatNumber$.next(vatString);
  }
}
