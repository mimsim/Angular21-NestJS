import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = signal<string | null>(null)
  type = signal<ToastType>('success')

  show(text: string, type: ToastType = 'success') {
    this.type.set(type)
    this.message.set(text);
    setTimeout(()=> this.message.set(null), 10000)
  }
}
