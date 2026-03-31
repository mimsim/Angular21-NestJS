import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './shared/interceptors/error-interceptor';
import { BROWSER_TOKEN } from './core/storage.token';

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
    }
  ]
};
