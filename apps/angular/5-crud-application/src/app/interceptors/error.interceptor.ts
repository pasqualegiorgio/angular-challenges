import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export function errorsInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error) => {
      console.error('Intercepted error:', error);

      const errorMessage = getErrorMessage(error);
      alert(`An error has been thrown: ${errorMessage}`);

      return throwError(() => new Error(errorMessage));
    }),
  );
}

const getErrorMessage = (error: any): string => {
  if (error.status === 404) {
    return 'Resource not found';
  }
  if (error.status === 500) {
    return 'Internal server error. Try again later.';
  }
  return 'Something went wrong between communication with the server.';
};
