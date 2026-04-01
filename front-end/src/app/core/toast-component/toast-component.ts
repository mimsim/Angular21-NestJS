import { Component, inject } from '@angular/core';
import { ToastService } from '../../shared/services/toast-service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toast',
    imports: [
        CommonModule
    ],
    standalone: true,
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.scss',
})
export class ToastComponent {
    toastService = inject(ToastService)
}
