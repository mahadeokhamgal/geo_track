import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // encapsulation: ViewEncapsulation.Emulated,
})
export class App {
  protected readonly title = signal('geo_track');
}
