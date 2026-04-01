import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { ToastComponent } from './core/toast-component/toast-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular21-nest';
}
