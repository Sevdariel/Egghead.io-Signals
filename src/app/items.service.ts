import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  #items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ])

  items = this.#items.asReadonly();

  append(name: string) {
    this.#items.update(prev => [...prev, { id: prev.length + 1, name: name }]);
  }

  clearItems() {
    this.#items.set([]);
  }
}
