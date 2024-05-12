import { CommonModule } from '@angular/common';
import { Component, Signal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
  title = 'Egghead.io-Signals';

  lastItem = computed(() => this.items().slice(-1)[0]);

  items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ])

  handleClick() {
    console.log(this.items());
  }

  nameFilter = signal('');

  //items() + nameFilter()
  filteredItems = computed(() => {
    // case-sensitive
    // return this.items().filter(item => item.name.includes(this.nameFilter()));

    // case-insensitive
    const nameFilter = this.nameFilter().toLowerCase();
    return this.items().filter(item => item.name.toLowerCase().includes(nameFilter));
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
  a = signal('John');
  b: Signal<string> = computed(() => this.a() + this.c());
  c: Signal<string> = computed(() => this.a() + this.b());
}
