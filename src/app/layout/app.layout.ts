import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.layout.html',
  styleUrl: './app.layout.less',
})
export class AppLayout {
  constructor() {}
}
