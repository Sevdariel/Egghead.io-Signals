import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
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

  nameFilter = signal('Andy');

  //items() + nameFilter()
  filteredItems = computed(() => {
    // case-sensitive
    // return this.items().filter(item => item.name.includes(this.nameFilter()));

    // case-insensitive
    const nameFilter = this.nameFilter().toLowerCase();
    return this.items().filter(item => item.name.toLowerCase().includes(nameFilter));
  })
}
