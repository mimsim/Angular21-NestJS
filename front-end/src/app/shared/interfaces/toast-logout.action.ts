import { inject } from '@angular/core';
import { ILogoutAction } from './logout-action.token';
import { ToastService } from '../services/toast-service';


export class ToastLogoutAction implements ILogoutAction {
    private toast = inject(ToastService);

    perform() {
        this.toast.show('Успешно излязохте!', 'success');
    }
}