import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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

  #item = signal<string | undefined>('hey');
  get item() {
    return this.#item();
  }


  items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ])
}
