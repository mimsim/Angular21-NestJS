import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './shared/interceptors/error-interceptor';
import { BROWSER_TOKEN } from './core/storage.token';
import { LOGOUT_ACTIONS } from './shared/interfaces/logout-action.token';
import { StorageLogoutAction } from './shared/services/auth';
import { ToastLogoutAction } from './shared/interfaces/toast-logout.action';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([errorInterceptor])
    ),
    provideZonelessChangeDetection(),
    {
      provide: BROWSER_TOKEN, 
      useFactory: () => window.localStorage
    },
    { provide: LOGOUT_ACTIONS, useClass: StorageLogoutAction, multi: true },
    { provide: LOGOUT_ACTIONS, useClass: ToastLogoutAction, multi: true },
  ]
};
