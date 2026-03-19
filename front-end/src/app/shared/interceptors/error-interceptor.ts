import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'error';
      if (error.status === 401) {
        errorMessage = 'Неоторизиран достъп - моля, влезте отново.';
      } else if (error.status === 404) {
        errorMessage = 'Ресурсът не е намерен.';
      }

      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }
    )
  )
};
