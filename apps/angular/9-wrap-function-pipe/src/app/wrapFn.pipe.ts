import { Pipe } from '@angular/core';

@Pipe({
  name: 'wrapFn',
})
export class WrapFnPipe {
  transform<Fn extends (...args: any[]) => any>(
    fn: Fn,
    ...args: Parameters<Fn>
  ): ReturnType<Fn> {
    return fn(...args);
  }
}
