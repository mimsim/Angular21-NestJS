import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Възникна грешка';

      if (error.status === 400) {
        // NestJS изпраща грешките в error.error.message
        const validationErrors = error.error.message;
        errorMessage = `Грешка при валидация: ${Array.isArray(validationErrors) ? validationErrors.join(', ') : validationErrors}`;
      } else if (error.status === 401) {
        errorMessage = 'Неоторизиран достъп.';
      }

      console.error('ПОДРОБНА ГРЕШКА:', error.error); // ТОВА ЩЕ ТИ КАЖЕ ВСИЧКО
      return throwError(() => new Error(errorMessage));
    })
  );
};