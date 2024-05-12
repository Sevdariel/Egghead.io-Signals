import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() {
    this.consoleLogEffect;
  }

  consoleLogEffect = effect(() => {
    console.log('this.#items()', this.#items())
    console.log('this.example()', this.example())
  });

  example = signal(123);

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
