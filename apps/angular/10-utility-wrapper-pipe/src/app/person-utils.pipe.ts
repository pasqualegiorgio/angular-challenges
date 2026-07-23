import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

type UtilsMap = {
  showName: typeof PersonUtils.showName;
  isAllowed: typeof PersonUtils.isAllowed;
};
type FunctionArgs<T extends keyof UtilsMap> = Parameters<UtilsMap[T]>;
type ShowNameArgs = FunctionArgs<'showName'>;
type isAllowedArgs = FunctionArgs<'isAllowed'>;

type FunctionReturn<T extends keyof UtilsMap> = ReturnType<UtilsMap[T]>;
type ShowNameReturn = FunctionReturn<'showName'>;
type isAllowedReturn = FunctionReturn<'isAllowed'>;

@Pipe({
  name: 'personUtils',
})
export class PersonUtilsPipe implements PipeTransform {
  transform(
    functionName: 'showName',
    arg1: ShowNameArgs[0],
    arg2: ShowNameArgs[1],
  ): ShowNameReturn;

  transform(
    functionName: 'isAllowed',
    arg1: isAllowedArgs[0],
    arg2: isAllowedArgs[1],
    arg3: isAllowedArgs[2],
  ): isAllowedReturn;

  transform(functionName: keyof UtilsMap, ...args: unknown[]): string {
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
