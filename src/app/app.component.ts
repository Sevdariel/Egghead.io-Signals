import { CommonModule } from '@angular/common';
import { Component, Signal, computed, effect, inject, signal, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  itemsSvc = inject(ItemsService);
  title = 'Egghead.io-Signals';

  lastItem = computed(() => this.itemsSvc.items().slice(-1)[0]);

  consoleLogEffect = effect(() => {
    console.log('untracked', this.itemsSvc.items(), untracked(() => this.nameFilter()));
  });

  newItemName = signal('');
  updateNewItemName($event: Event) {
    this.newItemName.set(($event.target as HTMLInputElement)['value']);
  }

  handleClick() {
    console.log('this.items()', this.itemsSvc.items());
  }

  nameFilter = signal('');

  updateNameFilter($event: Event) {
    this.nameFilter.set(($event.target as HTMLInputElement)['value']);
  }

  //items() + nameFilter()
  filteredItems = computed(() => {
    // case-sensitive
    // return this.items().filter(item => item.name.includes(this.nameFilter()));

    // case-insensitive
    const nameFilter = this.nameFilter().toLowerCase();
    return this.itemsSvc.items().filter(item => item.name.toLowerCase().includes(nameFilter));
  })

  ascOrder = signal(false);

  visibleItems = computed(() => {
    const order = this.ascOrder() ? 1 : -1;
    return this.filteredItems().sort((a, b) => {
      return a.name.localeCompare(b.name) * order;
    });
  });

  // Circular dependency in computed signal will cause angular error
  // Detected cycle in computations
  // a = signal('John');
  // b: Signal<string> = computed(() => this.a() + this.c());
  // c: Signal<string> = computed(() => this.a() + this.b());
}
