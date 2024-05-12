import { Injectable, effect, signal, untracked } from '@angular/core';
import _ from 'lodash';

type Item = {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() {
  }

  example = signal(123);

  synchronizeItemsEffect = effect(() => {
    localStorage.setItem('items', JSON.stringify(this.#items()));
  })

  #items = signal(JSON.parse(localStorage.getItem('items')!) as Array<Item>
    //{ equal: _.isEqual }
    // ], {equal: (prev, curr) => Object.is(prev, curr)})
    // Object.is compares reference
  );
  items = this.#items.asReadonly();

  append(name: string) {
    this.#items.update(prev => [...prev, { id: prev.length + 1, name: name }]);
  }

  clearItems() {
    this.#items.set([]);
  }
}
