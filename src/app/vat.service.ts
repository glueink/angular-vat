import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, timeout } from 'rxjs/operators';

@Injectable()
export class VatService {
  constructor() {}
  getVat(vatString) {
    const vatUrl: String = 'https://vat.erply.com/numbers?vatNumber=';

    if (!vatString.trim()) { return of({}); }
    return ajax(vatUrl + vatString).pipe(
      timeout(3000),
      map(data => data.response),
      catchError(error => of({ error: error })),
    );
  }
}
