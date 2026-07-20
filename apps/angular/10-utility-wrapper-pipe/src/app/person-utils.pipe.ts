import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

type UtilsFunctions = {
  showName: typeof PersonUtils.showName;
  isAllowed: typeof PersonUtils.isAllowed;
};

@Pipe({
  name: 'personUtils',
})
export class PersonUtilsPipe implements PipeTransform {
  transform(functionName: keyof UtilsFunctions, ...args: unknown[]): string {
    if (functionName === 'showName')
      return PersonUtils.showName(args[0] as string, args[1] as number);

    if (functionName === 'isAllowed')
      return PersonUtils.isAllowed(
        args[0] as number,
        args[1] as boolean,
        args[2] as number,
      );

    throw new Error(`Function ${functionName} not supported`);
  }
}
