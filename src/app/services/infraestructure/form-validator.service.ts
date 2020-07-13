import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl } from "@angular/forms";

@Injectable()
export class FormValidatorService {

  constructor() { }

  public static emailCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      // tslint:disable-next-line:max-line-length
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const input = control.value;
      const isValid = re.test(input);

      if (!isValid) {
        return { "emailCheck": { isValid } };
      } else {
        return null;
      }
    };
  }

  public static numberCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const re = new RegExp("^(\\d+)$");
      const input = control.value;
      const isValid = re.test(input);

      if (!isValid) {
        return { "number_check": { isValid } };
      } else {
        return null;
      }
    };
  }

  public static URLCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      // tslint:disable-next-line:max-line-length
      const re = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
      const input = control.value;
      const isValid = re.test(input);

      if (!isValid) {
        return { "url_check": { isValid } };
      } else {
        return null;
      }
    };
  }

}