import { Injectable, effect, signal, untracked } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() {
  }

  example = signal(123);

  #items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ],
    //{ equal: _.isEqual }
    // ], {equal: (prev, curr) => Object.is(prev, curr)})
    // Object.is compares reference
  );
  items = this.#items.asReadonly();

  append(name: string) {
    this.#items.update(prev => [...prev, { id: prev.length + 1, name: name }]);
  }

  clearItems() {
    this.#items.set([
      { id: 1, name: 'Andy' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  }
}
